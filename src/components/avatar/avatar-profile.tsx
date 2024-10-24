"use client";

import { LogoutOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, theme } from "antd";
import React from "react";

const items = [
  {
    key: "0",
    label: "View Profile",
  },
  {
    key: "1",
    label: "Settings",
  },
  {
    key: "2",
    label: "Logout",
    danger: true,
    icon: React.createElement(LogoutOutlined),
  },
];
export default function AvatarProfile(props: {
  firstName: string;
  lastName: string;
}) {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <Dropdown
      menu={{ onClick: () => {}, items: items }}
      placement="bottomRight"
      trigger={["click"]}
    >
      <Avatar
        size={"large"}
        style={{ cursor: "pointer", backgroundColor: colorPrimary }}
      >
        <span className="font-medium text-base">
          {props.firstName[0].toUpperCase()}
          {props.lastName[0].toUpperCase()}
        </span>
      </Avatar>
    </Dropdown>
  );
}
