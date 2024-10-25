"use client";

import React from "react";
import { Layout, Card, Menu, theme } from "antd";
import { useRouter, usePathname } from "next/navigation";
import { ItemType } from "antd/es/menu/interface";
import getAdminSideMenuItems from "./admin-side-menu-items";

const { Sider } = Layout;

export default function AdminSideMenu() {
  const router = useRouter();
  const pathName = usePathname();

  const {
    token: { colorPrimaryBg, colorBgContainer, borderRadius },
  } = theme.useToken();

  const siderStyle: React.CSSProperties = {
    // overflow: "auto",
    scrollbarWidth: "thin",
    scrollbarGutter: "stable",
    backgroundColor: colorBgContainer,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 0,
    margin: 0,
    borderRadius: borderRadius,
  };
  const items: ItemType[] = getAdminSideMenuItems(({ key }) => {
    router.replace(key);
  });

  return (
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
        mode="inline"
        defaultSelectedKeys={[pathName]}
        selectable={true}
        activeKey={pathName}
        items={items}
        style={{
          backgroundColor: "transparent",
          marginTop: 20,
          border: "none",
        }}
      />
    </Sider>
  );
}
