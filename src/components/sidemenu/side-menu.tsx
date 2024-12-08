"use client";

import React from "react";
import { Button, Layout, Menu, Typography, theme as antdTheme } from "antd";
import { useRouter, usePathname } from "next/navigation";
import { ItemType } from "antd/es/menu/interface";
import { Header } from "antd/es/layout/layout";
import DashboardIcon from "../icons/material/dashboard";

const { Sider } = Layout;

export default function SideMenu(props: {
  menuLabel?: string;
  onMenuClicked?: () => void;
  getItems: (onClick?: (info: { key: string }) => void) => ItemType[];
}) {
  // React hooks
  const router = useRouter();
  const pathName = usePathname();

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  const sideMenuStyle: React.CSSProperties = {
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
      style={sideMenuStyle}
      trigger={null}
      collapsible={true}
      collapsed={false}
      className="border-r backdrop-blur-md"
    >
      <div
        style={{
          padding: "10px 10px 0px 10px",
        }}
        className="w-full"
      >
        <Header
          style={{
            padding: "10px 15px 10px 15px",
            backgroundColor: theme.colorPrimaryBg,
            borderRadius: theme.borderRadius,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
          }}
          className="border"
        >
          <Button
            size="large"
            color="primary"
            variant="outlined"
            icon={<DashboardIcon />}
            className="w-full"
          >
            <Typography.Text
              ellipsis
              style={{
                color: theme.colorPrimary,
              }}
              className="w-auto max-w-[75%]"
            >
              {props.menuLabel ?? "Dashboard"}
            </Typography.Text>
          </Button>
        </Header>
      </div>
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
