"use client";

import React from "react";
import { Button, Flex, theme } from "antd";
import UsersTable from "@/components/tables/users-table";
import {
  DeleteOutlined,
  MailOutlined,
  MessageOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import { Typography } from "antd";

const { Text } = Typography;

export default function Page() {
  const {
    token: { colorBgContainer, borderRadius },
  } = theme.useToken();

  return (
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
  );
}
