"use client";

import React from "react";
import { Breadcrumb, Card, Layout, Menu, theme, Badge, Button } from "antd";
import { MenuItemType } from "antd/es/menu/interface";
import AvatarProfile from "@/components/avatar/avatar-profile";

import HomeIcon from "@/components/icons/hugeicons/home";
import ShieldIcon from "@/components/icons/hugeicons/shield";
import UserIcon from "@/components/icons/hugeicons/user";
import HistoryIcon from "@/components/icons/hugeicons/history";
import UserSwitchIcon from "@/components/icons/hugeicons/user-switch";
import { useRouter } from "next/navigation";
import {
  MessageOutlined,
  NodeCollapseOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

const { Sider, Header, Content } = Layout;

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {
    token: { colorPrimaryBg, colorBgContainer, borderRadius },
  } = theme.useToken();
  const router = useRouter();

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

  const items: MenuItemType[] = [
    {
      key: "0",
      icon: React.createElement(HomeIcon),
      label: "Home",
      style: { gap: 5 },
      onClick: () => {
        router.replace("/admin/home");
      },
    },
    {
      key: "1",
      icon: React.createElement(UserSwitchIcon),
      label: "Roles",
      style: { gap: 5 },
      onClick: () => {
        router.replace("/admin/roles");
      },
    },
    {
      key: "2",
      icon: React.createElement(ShieldIcon),
      label: "Permissions",
      style: { gap: 5 },
      onClick: () => {
        router.replace("/admin/permissions");
      },
    },
    {
      key: "3",
      icon: React.createElement(UserIcon),
      label: "Users",
      style: { gap: 5 },
      onClick: () => {
        router.replace("/admin/users");
      },
    },
    {
      key: "4",
      icon: React.createElement(HistoryIcon),
      label: "History",
      style: { gap: 5 },
      onClick: () => {
        router.replace("/admin/history");
      },
    },
  ];

  const toggleSidebar = () => {
    // TODO
  };

  return (
    <Layout style={{ minHeight: "100vh", padding: 12, gap: 10 }}>
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
          selectable={true}
          activeKey={"0"}
          items={items}
          style={{
            backgroundColor: "transparent",
            marginTop: 20,
            border: "none",
          }}
        />
      </Sider>
      <Layout style={{ scrollbarWidth: "thin" }}>
        <Header
          style={{
            padding: "10px 15px 10px 15px",
            background: colorBgContainer,
            borderRadius: borderRadius,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
          }}
        >
          <div className="flex flex-wrap justify-center items-center gap-5">
            <Button
              size="large"
              icon={<NodeCollapseOutlined />}
              onClick={toggleSidebar}
            >
              Hide
            </Button>
            <Breadcrumb
              separator="/"
              items={[
                {
                  title: "Administration",
                  href: "/admin/home",
                },
                {
                  title: "Users",
                  href: "/admin/users",
                },
              ]}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button size="large" icon={<QuestionCircleOutlined />}>
              Help
            </Button>
            <Button
              size="large"
              icon={
                <Badge
                  size="small"
                  count={5}
                  offset={[-2, 1]}
                  style={{ cursor: "pointer" }}
                >
                  <MessageOutlined />
                </Badge>
              }
            />
            <AvatarProfile firstName="P" lastName="A" />
          </div>
        </Header>
        <Content style={{ marginTop: 10, overflow: "initial" }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
