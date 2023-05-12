import { Avatar, Rate, Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { getInventory } from "../../API/Api";

function Inventory() {
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        setLoading(true);
        getInventory().then((res) => {
            setDataSource(res.products);
            setLoading(false);
        });
    }, []);
    return (
        <Space size={20} direction="vertical">
            <Typography.Title level={4}>Inventory</Typography.Title>
            <Table
                columns={[
                    {
                        title: "Thumbnail",
                        dataIndex: "thumbnail",
                        render: (link) => {
                            return <Avatar src={link} />;
                        },
                    },
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
                        title: "Rating",
                        dataIndex: "rating",
                        render: (rating) => {
                            return <Rate value={rating} />;
                        },
                    },
                    {
                        title: "Stock",
                        dataIndex: "stock",
                    },

                    {
                        title: "Brand",
                        dataIndex: "brand",
                    },
                    {
                        title: "Category",
                        dataIndex: "category",
                    },
                ]}
                dataSource={dataSource}
                pagination={{
                    pageSize: 6,
                }}
                loading={loading}
            />
        </Space>
    );
}

export default Inventory;
