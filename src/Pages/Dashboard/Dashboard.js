import {
    ShoppingCartOutlined,
    ShoppingOutlined,
    DollarCircleOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Card, Space, Statistic, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import {
    getCustomers,
    getInventory,
    getOrders,
    getRevenue,
} from "../../API/Api";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";

function Dashboard() {
    const [orders, setOrders] = useState(0);
    const [inventory, setInventory] = useState(0);
    const [customers, setCustomers] = useState(0);
    const [revenue, setRevenue] = useState(0);

    useEffect(() => {
        getOrders().then((res) => {
            setOrders(res.total);
            setRevenue(res.discountedTotal);
        });
        getInventory().then((res) => {
            setInventory(res.total);
        });
        getCustomers().then((res) => {
            setCustomers(res.total);
        });
    }, []);
    return (
        <Space size={20} direction="vertical">
            <Typography.Title level={4}>Dashboard</Typography.Title>
            <Space
                direction="horizontal"
                style={{ display: "flex", justifyContent: "space-between" }}
            >
                <DashboardCard
                    icon={
                        <ShoppingCartOutlined
                            style={{
                                color: "green",
                                backgroundColor: "rgba(0,255,0,0.25)",
                                borderRadius: 50,
                                fontSize: 24,
                                padding: 8,
                            }}
                        />
                    }
                    title={"Orders"}
                    value={orders}
                />
                <DashboardCard
                    icon={
                        <ShoppingOutlined
                            style={{
                                color: "blue",
                                backgroundColor: "rgba(0,0,255,0.25)",
                                borderRadius: 50,
                                fontSize: 24,
                                padding: 8,
                            }}
                        />
                    }
                    title={"Inventory"}
                    value={inventory}
                />
                <DashboardCard
                    icon={
                        <UserOutlined
                            style={{
                                color: "purple",
                                backgroundColor: "rgba(0,255,255,0.25)",
                                borderRadius: 50,
                                fontSize: 24,
                                padding: 8,
                            }}
                        />
                    }
                    title={"Customers"}
                    value={customers}
                />
                <DashboardCard
                    icon={
                        <DollarCircleOutlined
                            style={{
                                color: "red",
                                backgroundColor: "rgba(255,0,0,0.25)",
                                borderRadius: 50,
                                fontSize: 24,
                                padding: 8,
                            }}
                        />
                    }
                    title={"Revenue"}
                    value={revenue}
                />
            </Space>
            <Space>
                <RecentOrders />
                <DashBoardChart />
            </Space>
        </Space>
    );
}

function DashboardCard({ icon, title, value }) {
    return (
        <Card>
            <Space direction="horizontal" style={{ width: "200px" }}>
                {icon}
                <Statistic title={title} value={value} />
            </Space>
        </Card>
    );
}

function RecentOrders() {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getOrders().then((res) => {
            setDataSource(res.products);
            setLoading(false);
        });
    }, []);
    return (
        <>
            <Typography.Text>Orders</Typography.Text>
            <Table
                size="large"
                columns={[
                    {
                        title: "Title",
                        dataIndex: "title",
                    },
                    {
                        title: "Quantity",
                        dataIndex: "quantity",
                    },
                    {
                        title: "Price",
                        dataIndex: "discountedPrice",
                    },
                ]}
                dataSource={dataSource}
                loading={loading}
                pagination={false}
            />
        </>
    );
}

function DashBoardChart() {
    const [revenueData, setRevenueData] = useState({
        labels: [],
        datasets: [],
    });
    useEffect(() => {
        getRevenue().then((res) => {
            const labels = res.carts.map((cart) => {
                return `User-${cart.userId}`;
            });
            const data = res.carts.map((cart) => {
                return cart.discountedTotal;
            });
            const dataSource = {
                labels,
                datasets: [
                    {
                        label: "Revenue",
                        data: data,
                        backgroundColor: "rgba(255, 0, 0, 1)",
                    },
                ],
            };
            setRevenueData(dataSource);
        });
    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
            },
            title: {
                display: true,
                text: "Order Revenue",
            },
        },
    };

    return (
        <Card style={{ width: 700, height: 350 }}>
            <Bar options={options} data={revenueData} />
        </Card>
    );
}

export default Dashboard;
