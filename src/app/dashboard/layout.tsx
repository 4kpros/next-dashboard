"use client";

import React from "react";
import { Card, Layout, Menu, theme } from "antd";
import { MenuItemType } from "antd/es/menu/interface";

import HomeIcon from "@/icons/home";
import ShieldIcon from "@/icons/shield";
import UserIcon from "@/icons/user";
import HistoryIcon from "@/icons/history";
import UserSwitchIcon from "@/icons/user-switch";

const { Sider } = Layout;

const items: MenuItemType[] = [
  {
    key: 0,
    icon: React.createElement(HomeIcon),
    label: "Home",
    style: { gap: 5 },
  },
  {
    key: 1,
    icon: React.createElement(UserSwitchIcon),
    label: "Roles",
    style: { gap: 5 },
  },
  {
    key: 2,
    icon: React.createElement(ShieldIcon),
    label: "Permissions",
    style: { gap: 5 },
  },
  {
    key: 3,
    icon: React.createElement(UserIcon),
    label: "Users",
    style: { gap: 5 },
  },
  {
    key: 4,
    icon: React.createElement(HistoryIcon),
    label: "History",
    style: { gap: 5 },
  },
];

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {
    token: { colorPrimaryBg, colorBgContainer, borderRadius },
  } = theme.useToken();

  const siderStyle: React.CSSProperties = {
    // overflow: "auto",
    scrollbarWidth: "thin",
    scrollbarGutter: "stable",
    backgroundColor: colorBgContainer,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 0,
    margin: 0,
    borderRadius: borderRadius,
  };

  return (
    <Layout style={{ minHeight: "100vh", padding: 12, gap: 10, }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        style={siderStyle}
        trigger={null}
        collapsible
        collapsed={false}
      >
        <Card
          style={{
            backgroundColor: colorPrimaryBg,
            verticalAlign: "middle",
            marginTop: 10,
            height: 60,
            width: 170,
          }}
        ></Card>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["0"]}
          items={items}
          style={{
            backgroundColor: "transparent",
            marginTop: 20,
            border: "none",
          }}
        />
      </Sider>
      {children}
    </Layout>
  );
}
