import {
  NodeCollapseOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Badge, Breadcrumb, Button } from "antd";
import { theme as antdTheme } from "antd";
import { Header } from "antd/es/layout/layout";
import React from "react";
import NotificationsIcon from "../icons/material/notifications";
import AvatarProfile from "../avatar/avatar-profile";
import { useRouter } from "next/navigation";
import {
  BreadcrumbItemType,
  BreadcrumbSeparatorType,
} from "antd/es/breadcrumb/Breadcrumb";

export default function DashboardHeader(props: {
  notificationsCount?: number;
  breadcrumbItems?: Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[];
  toggleSidebar?: () => void;
  onClickNotifications?: () => void;
}) {
  // React hooks
  const router = useRouter();

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  return (
    <>
      <Header
        style={{
          padding: "10px 15px 10px 15px",
          backgroundColor: theme.colorBgContainer,
          borderRadius: theme.borderRadius,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
        }}
        className="border"
      >
        <div className="flex flex-wrap justify-center items-center gap-5">
          <Button
            size="large"
            icon={<NodeCollapseOutlined />}
            onClick={props.toggleSidebar}
          >
            Hide
          </Button>
          <Breadcrumb separator="/" items={props.breadcrumbItems} />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            size="large"
            icon={<QuestionCircleOutlined />}
            onClick={() => router.push("/common/help")}
          >
            Help
          </Button>
          <Button
            size="large"
            icon={
              <Badge
                size="small"
                count={props.notificationsCount}
                offset={[-2, 1]}
                style={{ cursor: "pointer" }}
              >
                <NotificationsIcon />
              </Badge>
            }
            onClick={props.onClickNotifications}
          />
          <AvatarProfile />
        </div>
      </Header>
    </>
  );
}
