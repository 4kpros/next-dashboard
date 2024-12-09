"use client";

import { getDashboardPath } from "@/lib/links/dashboard";
import { LogoutOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, theme as antdTheme } from "antd";
import { signOut, useSession } from "next-auth/react";
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
export default function AvatarProfile() {
  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  // React hooks
  const router = useRouter();

  // Next hooks
  const session = useSession();

  return (
    <>
      {session.status === "loading" ? (
        <Avatar size={"large"} className="opacity-50">
          <span className="font-medium text-base">...</span>
        </Avatar>
      ) : (
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
                  router.push(
                    getDashboardPath(session.data?.user?.feature ?? "")
                  );
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
            src={session.data?.user?.image}
            style={{
              cursor: "pointer",
              backgroundColor: theme.colorPrimary,
            }}
          >
            <span className="font-medium text-base">
              {(session.data?.user?.nameTrunc?.length ?? 0) < 2
                ? "NA"
                : session.data?.user?.nameTrunc ?? "NA"}
            </span>
          </Avatar>
        </Dropdown>
      )}
    </>
  );
}
