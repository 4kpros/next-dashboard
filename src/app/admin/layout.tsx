"use client";

import { Breadcrumb, Layout, Badge, Button, theme as antdTheme } from "antd";
import {
  NodeCollapseOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import AvatarProfile from "@/components/avatar/avatar-profile";
import MotionLayout from "@/components/motion/motion-layout";
import {
  MotionPageTransitionFromBottom,
  MotionPageTransitionFromLeft,
  MotionPageTransitionFromTop,
} from "@/components/motion/motion-page";
import SideMenu from "@/components/sidemenu/side-menu";
import getAdminSideMenuItems from "@/components/sidemenu/admin-side-menu-items";
import { usePathname, useRouter } from "next/navigation";
import {
  BreadcrumbItemType,
  BreadcrumbSeparatorType,
} from "antd/es/breadcrumb/Breadcrumb";
import NotificationsIcon from "@/components/icons/material/notifications";

const { Header, Content } = Layout;

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // React hooks
  const router = useRouter();
  const pathName = usePathname();

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  const toggleSidebar = () => {
    // TODO
  };

  return (
    <MotionLayout>
      <Layout
        style={{
          backgroundColor: "transparent",
          scrollbarWidth: "thin",
          minHeight: "100vh",
        }}
      >
        <MotionPageTransitionFromLeft>
          <SideMenu
            menuLabel="Dashboard"
            onMenuClicked={() => {
              // TODO
            }}
            getItems={getAdminSideMenuItems}
          />
        </MotionPageTransitionFromLeft>
        <Layout
          style={{
            marginLeft: 210,
            scrollbarWidth: "thin",
            gap: 10,
            marginTop: "10px",
            marginRight: "10px",
            backgroundColor: "transparent",
          }}
        >
          <MotionPageTransitionFromTop>
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
                  onClick={toggleSidebar}
                >
                  Hide
                </Button>
                <Breadcrumb separator="/" items={breadcrumbItems(pathName)} />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  size="large"
                  icon={<QuestionCircleOutlined />}
                  onClick={() => router.push("/help")}
                >
                  Help
                </Button>
                <Button
                  size="large"
                  icon={
                    <Badge
                      size="small"
                      count={5}
                      offset={[-2, 1]}
                      style={{ cursor: "pointer" }}
                    >
                      <NotificationsIcon />
                    </Badge>
                  }
                />
                <AvatarProfile />
              </div>
            </Header>
          </MotionPageTransitionFromTop>
          <MotionPageTransitionFromBottom>
            <Content
              style={{
                overflow: "initial",
                backgroundColor: theme.colorBgContainer,
                borderRadius: theme.borderRadius,
              }}
              className="border p-0 m-0"
            >
              {children}
            </Content>
          </MotionPageTransitionFromBottom>
        </Layout>
      </Layout>
    </MotionLayout>
  );
}

const breadcrumbItems = (pathName: string) => {
  let list: Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[] = [];
  if (pathName.startsWith("/admin/")) {
    list = [
      {
        title: "Administration",
        href: "/admin/home",
      },
    ];
  } else if (pathName.startsWith("/director/")) {
    list = [
      {
        title: "School direction",
        href: "/director/home",
      },
    ];
  } else if (pathName.startsWith("/teacher/")) {
    list = [
      {
        title: "Professor & Teacher",
        href: "/teacher/home",
      },
    ];
  } else if (pathName.startsWith("/student/")) {
    list = [
      {
        title: "Student & Pupil",
        href: "/student/home",
      },
    ];
  } else if (pathName.startsWith("/parent/")) {
    list = [
      {
        title: "Parent",
        href: "/parent/home",
      },
    ];
  }

  return list;
};
