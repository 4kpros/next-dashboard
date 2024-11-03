"use client";

import React from "react";
import { Layout, Menu, theme } from "antd";
import { useRouter, usePathname } from "next/navigation";
import { ItemType } from "antd/es/menu/interface";
import getAdminSideMenuItems from "./admin-side-menu-items";

const { Sider } = Layout;

export default function AdminSideMenu() {
  const router = useRouter();
  const pathName = usePathname();

  const {
    token: { colorPrimaryBg, colorBgContainer },
  } = theme.useToken();

  const siderStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    overflow: "auto",
    scrollbarWidth: "thin",
    scrollbarGutter: "auto",
    backgroundColor: colorBgContainer,
    height: "100%",
    // borderRadius: borderRadius,
  };
  const items: ItemType[] = getAdminSideMenuItems(({ key }) => {
    router.replace(key);
  });

  return (
    <Sider
      breakpoint={"lg"}
      collapsedWidth={0}
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      style={siderStyle}
      trigger={null}
      collapsible={true}
      collapsed={false}
    >
      <div
        className="w-full h-16"
        style={{
          backgroundColor: colorPrimaryBg,
        }}
      ></div>
      <Menu
        mode="inline"
        defaultSelectedKeys={[pathName]}
        selectable={true}
        activeKey={pathName}
        items={items}
        style={{
          backgroundColor: "transparent",
          paddingTop: 20,
          paddingBottom: 20,
          border: "none",
        }}
      />
    </Sider>
  );
}
