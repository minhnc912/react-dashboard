import { Badge, Drawer, Image, List, Space, Typography } from "antd";
import React, { useEffect, useState } from "react";
import homeImage from "../../assets/images/dp.png";
import { MailOutlined, BellFilled } from "@ant-design/icons";
import { getComments, getOrders } from "../../API/Api";

function Header() {
    const [comments, setComments] = useState([]);
    const [orders, setOrders] = useState([]);
    const [commentsIsOpen, setCommentsIsOpen] = useState(false);
    const [notifyIsOpen, setNotifyIsOpen] = useState(false);

    useEffect(() => {
        getComments().then((res) => {
            setComments(res.comments);
        });
        getOrders().then((res) => {
            setOrders(res.products);
        });
    }, []);

    return (
        <div className="Header">
            <Image width={40} src={homeImage} />
            <Typography.Title>Dashboard</Typography.Title>
            <Space>
                <Badge count={comments.length} dot>
                    <MailOutlined
                        style={{ fontSize: 24 }}
                        onClick={() => {
                            setCommentsIsOpen(true);
                        }}
                    />
                </Badge>
                <Badge count={orders.length}>
                    <BellFilled
                        style={{ fontSize: 24 }}
                        onClick={() => {
                            setNotifyIsOpen(true);
                        }}
                    />
                </Badge>
            </Space>
            <Drawer
                title="Comments"
                open={commentsIsOpen}
                onClose={() => {
                    setCommentsIsOpen(false);
                }}
                maskClosable
            >
                <List
                    dataSource={comments}
                    renderItem={(item) => {
                        return <List.Item>{item.body}</List.Item>;
                    }}
                ></List>
            </Drawer>
            <Drawer
                title="Notify"
                open={notifyIsOpen}
                onClose={() => {
                    setNotifyIsOpen(false);
                }}
                maskClosable
            >
                <List
                    dataSource={orders}
                    renderItem={(item) => {
                        return (
                            <List.Item>
                                <Typography.Text strong>{item.title} </Typography.Text> has been ordered!
                            </List.Item>
                        );
                    }}
                ></List>
            </Drawer>
        </div>
    );
}

export default Header;
