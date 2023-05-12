import { Avatar, Rate, Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { getCustomers } from "../../API/Api";

function Customers() {
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        setLoading(true);
        getCustomers().then((res) => {
            setDataSource(res.users);
            setLoading(false);
        });
    }, []);
    return (
        <Space size={20} direction="vertical">
            <Typography.Title level={4}>Customers</Typography.Title>
            <Table
                columns={[
                    {
                        title: "Image",
                        dataIndex: "image",
                        render: (link) => {
                            return <Avatar src={link} />;
                        },
                    },
                    {
                        title: "Firstname",
                        dataIndex: "firstName",
                    },
                    {
                        title: "Lastname",
                        dataIndex: "lastName",
                    },
                    {
                        title: "Email",
                        dataIndex: "email",
                    },
                    {
                        title: "Phone",
                        dataIndex: "phone",
                    },
                    {
                        title: "Address",
                        dataIndex: "address",
                        render: (address) => {
                            return (
                                <span>
                                    {address.address}. {address.city}
                                </span>
                            );
                        },
                    },
                ]}
                dataSource={dataSource}
                pagination={{
                    pageSize: 5,
                }}
                loading={loading}
            />
        </Space>
    );
}

export default Customers;
