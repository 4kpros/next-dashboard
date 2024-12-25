"use client";

import { Layout, theme as antdTheme } from "antd";
import MotionLayout from "@/components/motion/motion-layout";
import {
  MotionPageTransitionFromBottom,
  MotionPageTransitionFromLeft,
  MotionPageTransitionFromTop,
} from "@/components/motion/motion-page";
import sideMenuItems from "@/app/admin/(components)/side-menu-items";
import { usePathname } from "next/navigation";
import {
  BreadcrumbItemType,
  BreadcrumbSeparatorType,
} from "antd/es/breadcrumb/Breadcrumb";
import DashboardHeader from "@/components/header/dashboard-header";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getNotificationList } from "@/lib/api/others/notifications/routes";
import { useState } from "react";
import CustomModalWithoutFooter from "@/components/modal/custom-without-footer";
import NotificationList from "@/components/notifications/notification-list";
import DashboardSideMenu from "@/components/menu/dashboard-side-menu";

const { Content } = Layout;

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // React hooks
  const pathName = usePathname();
  const paramPage = "1";
  const paramLimit = "1";
  // Show role states
  const [showNotificationsModalOpen, setShowNotificationsModalOpen] =
    useState(false);

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  // Tanstack hooks
  const queryClient = useQueryClient();
  const queryKeyData = "notifications-data";
  const queryNotification = useQuery({
    queryKey: [queryKeyData],
    queryFn: async () =>
      getNotificationList({
        page: paramPage ?? undefined,
        limit: paramLimit ?? undefined,
      }),
  });

  return (
    <>
      <MotionLayout>
        <Layout
          style={{
            // backgroundColor: "transparent",
            backgroundColor: theme.colorBgLayout,
            scrollbarWidth: "thin",
            minHeight: "100vh",
          }}
        >
          <MotionPageTransitionFromLeft>
            <DashboardSideMenu
              menuLabel="Dashboard"
              onMenuClicked={() => {
                // TODO
              }}
              getItems={sideMenuItems}
            />
          </MotionPageTransitionFromLeft>
          <Layout
            style={{
              marginLeft: 280,
              scrollbarWidth: "thin",
              gap: 10,
              marginTop: "10px",
              marginRight: "10px",
              backgroundColor: "transparent",
            }}
          >
            <MotionPageTransitionFromTop>
              <DashboardHeader
                notificationsCount={
                  queryNotification.data?.data?.pagination.count ?? undefined
                }
                breadcrumbItems={breadcrumbItems(pathName)}
                toggleSidebar={() => {
                  // TODO
                }}
                onClickNotifications={() => {
                  queryClient.fetchQuery({
                    queryKey: [queryKeyData, "1", "1"],
                  });
                  setShowNotificationsModalOpen(true);
                }}
              />
            </MotionPageTransitionFromTop>
            <MotionPageTransitionFromBottom>
              <Content
                style={{
                  overflow: "initial",
                  // backgroundColor: "rgba(255, 255, 255, 0.6)",
                  backgroundColor: theme.colorBgContainer,
                  borderRadius: theme.borderRadius,
                  marginBottom: "10px",
                }}
                className="border p-0"
              >
                {children}
              </Content>
            </MotionPageTransitionFromBottom>
          </Layout>
        </Layout>
      </MotionLayout>

      {/* Show role modal */}
      <CustomModalWithoutFooter
        title="Notifications"
        content={
          <NotificationList
            items={queryNotification.data?.data ?? undefined}
            onClose={() => setShowNotificationsModalOpen(false)}
          />
        }
        modalOpen={showNotificationsModalOpen}
        maskClosable={true}
        width={800}
        onOk={() => setShowNotificationsModalOpen(false)}
        onCancel={() => setShowNotificationsModalOpen(false)}
      />
    </>
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
