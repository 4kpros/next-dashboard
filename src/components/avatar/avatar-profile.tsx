"use client";

import { LogoutOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, theme } from "antd";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const items = [
  {
    key: "/profile",
    label: "View Profile",
  },
  {
    key: "/profile/settings",
    label: "Settings",
  },
  {
    key: "/logout",
    label: "Logout",
    danger: true,
    icon: React.createElement(LogoutOutlined),
  },
];
export default function AvatarProfile(props: {
  nameTrunc?: string | null;
}) {
  const router = useRouter();
  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <Dropdown
      menu={{ onClick: (item) => {
        if(item.key != "/logout") {
          router.push(item.key)
        }else {
          signOut({
            redirect: true,
            redirectTo: "/auth/logout",
          })
        }
      }, items: items }}
      placement="bottomRight"
      trigger={["click"]}
    >
      <Avatar
        size={"large"}
        style={{ cursor: "pointer", backgroundColor: colorPrimary }}
      >
        <span className="font-medium text-base">
          {props.nameTrunc ?? "NA"}
        </span>
      </Avatar>
    </Dropdown>
  );
}
