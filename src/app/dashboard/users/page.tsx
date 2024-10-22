"use client";

import React from "react";
import { Avatar, Badge, Breadcrumb, Button, Flex, Layout, theme } from "antd";
import UsersTable from "@/components/tables/users-table";
import { Input } from "antd";
import {
  DeleteOutlined,
  MailOutlined,
  MessageOutlined,
  PrinterOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Typography } from "antd";

const { Text } = Typography;

const { Search } = Input;

const { Header, Content } = Layout;

export default function Page() {
  const {
    token: { colorBgContainer, borderRadius },
  } = theme.useToken();

  return (
    <Layout style={{ scrollbarWidth: "thin" }}>
      <Header
        style={{
          padding: "10px 20px 10px 20px",
          background: colorBgContainer,
          borderRadius: borderRadius,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
        }}
      >
        <div className="flex justify-center items-center">
          <Breadcrumb
            separator=">"
            items={[
              {
                title: "Application name",
                href: "/",
              },
              {
                title: "Administration",
                href: "/dashboard",
              },
              {
                title: "Users",
                href: "/dashboard/users",
              },
            ]}
          />
        </div>
        <Search
          placeholder="input search text"
          enterButton="Search"
          size="large"
          style={{ maxWidth: "500px" }}
        />
        <Flex>
          <Badge count={1}>
            <Avatar shape="square" icon={<UserOutlined />} />
          </Badge>
        </Flex>
      </Header>
      <Content style={{ marginTop: 10, overflow: "initial" }}>
        <div
          style={{
            padding: 24,
            textAlign: "center",
            background: colorBgContainer,
            borderRadius: borderRadius,
            minHeight: "100vh",
          }}
        >
          <div className="w-full flex flex-row items-center justify-between mb-5">
            <Flex gap="middle" align="center" wrap>
              <Button icon={<DeleteOutlined />}>Delete selection</Button>
              <Button icon={<PrinterOutlined />}>Print this page</Button>
            </Flex>
            <Text code>Total selected items : 0</Text>
            <Flex gap="middle" wrap>
              <Button icon={<MessageOutlined />}>Send message</Button>
              <Button icon={<MailOutlined />}>Send Email</Button>
            </Flex>
          </div>
          <UsersTable />
        </div>
      </Content>
    </Layout>
  );
}
