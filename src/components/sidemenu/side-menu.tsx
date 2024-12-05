"use client";

import React from "react";
import { Layout, Menu, theme as antdTheme } from "antd";
import { useRouter, usePathname } from "next/navigation";
import { ItemType } from "antd/es/menu/interface";

const { Sider } = Layout;

export default function SideMenu(props: {
  getItems: (onClick?: (info: { key: string }) => void) => ItemType[];
}) {
  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  // React hooks
  const router = useRouter();
  const pathName = usePathname();

  const siderStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    overflow: "auto",
    scrollbarWidth: "thin",
    scrollbarGutter: "auto",
    backgroundColor: theme.colorBgContainer,
    height: "100%",
    // borderRadius: borderRadius,
  };
  const items: ItemType[] = props.getItems(({ key }) => {
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
      className="border-r"
    >
      <div
        className="w-full h-[74px]"
        style={{
          backgroundColor: theme.colorPrimary,
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
          paddingTop: 22,
          paddingBottom: 22,
          border: "none",
        }}
      />
    </Sider>
  );
}
