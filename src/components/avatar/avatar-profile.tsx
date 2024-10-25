"use client";

import { LogoutOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, theme } from "antd";
import React from "react";

const items = [
  {
    key: "avatar-0",
    label: "View Profile",
  },
  {
    key: "avatar-1",
    label: "Settings",
  },
  {
    key: "avatar-2",
    label: "Logout",
    danger: true,
    icon: React.createElement(LogoutOutlined),
  },
];
export default function AvatarProfile(props: {
  firstName: string | null;
  lastName: string | null;
}) {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const firstNameChar =
    props.firstName && props.firstName.length >= 1
      ? props.firstName[0].toUpperCase().trim()
      : "";
  const lastNameChar =
    props.lastName && props.lastName.length >= 1
      ? props.lastName[0].toUpperCase().trim()
      : "";
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
          {firstNameChar.length == 1 ? firstNameChar : "A"}
          {lastNameChar.length == 1 ? lastNameChar : "A"}
        </span>
      </Avatar>
    </Dropdown>
  );
}
