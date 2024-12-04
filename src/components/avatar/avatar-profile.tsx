"use client";

import { getDashboardPath } from "@/utils/redirect/dashboard";
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
    key: "/dashboard",
    label: "Dashboard",
  },
  {
    key: "/logout",
    label: "Logout",
    danger: true,
    icon: React.createElement(LogoutOutlined),
  },
];
export default function AvatarProfile(props: {
  image?: string | null;
  nameTrunc?: string | null;
  feature?: string | null;
}) {
  const router = useRouter();
  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <Dropdown
      menu={{
        onClick: (item) => {
          if (item.key != "/logout") {
            router.push(item.key);
          } else {
            signOut({
              redirect: true,
              redirectTo: "/auth/logout",
            });
          }
          switch (item.key) {
            case "/logout":
              signOut({
                redirect: true,
                redirectTo: "/auth/logout",
              });
              break;
            case "/dashboard":
              router.push(getDashboardPath(props?.feature ?? ""));
              break;

            default:
              router.push(item.key);
              break;
          }
        },
        items: items,
      }}
      placement="bottomRight"
      trigger={["click"]}
    >
      <Avatar
        size={"large"}
        style={{
          cursor: "pointer",
          backgroundColor: colorPrimary,
          backgroundImage: props.image ?? "",
        }}
      >
        <span className="font-medium text-base">
          {(props.nameTrunc?.length ?? 0) < 2 ? "NA" : props.nameTrunc ?? "NA"}
        </span>
      </Avatar>
    </Dropdown>
  );
}
