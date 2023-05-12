import { Avatar, Rate, Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { getOrders } from "../../API/Api";

function Orders() {
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        setLoading(true);
        getOrders().then((res) => {
            setDataSource(res.products);
            setLoading(false);
        });
    }, []);
    return (
        <Space size={20} direction="vertical">
            <Typography.Title level={4}>Orders</Typography.Title>
            <Table
                columns={[
                    {
                        title: "Title",
                        dataIndex: "title",
                    },
                    {
                        title: "Price",
                        dataIndex: "price",
                        render: (value) => {
                            return <span>${value}</span>;
                        },
                    },
                    {
                        title: "DiscountedPrice",
                        dataIndex: "discountedPrice",
                        render: (value) => {
                            return <span>${value}</span>;
                        },
                    },
                    {
                        title: "Quantity",
                        dataIndex: "quantity",
                    },
                    {
                        title: "Total",
                        dataIndex: "total",
                    },
                ]}
                dataSource={dataSource}
                pagination={false}
                loading={loading}
            />
        </Space>
    );
}

export default Orders;
