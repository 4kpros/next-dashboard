import {
  Breadcrumb,
  Layout,
  theme as antdTheme,
  Badge,
  Button,
} from "antd";
import {
  MessageOutlined,
  NodeCollapseOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import AvatarProfile from "@/components/avatar/avatar-profile";
import MotionLayout from "@/components/motion/motion-layout";
import {
  MotionPageTransitionFromLeft,
  MotionPageTransitionFromTop,
} from "@/components/motion/motion-page";
import SideMenu from "@/components/sidemenu/side-menu";
import getAdminSideMenuItems from "@/components/sidemenu/admin-side-menu-items";

const { Header, Content } = Layout;

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  const toggleSidebar = () => {
    // TODO
  };

  return (
    <MotionLayout>
      <Layout style={{ scrollbarWidth: "thin", minHeight: "100vh" }}>
        <MotionPageTransitionFromLeft>
          <SideMenu getItems={getAdminSideMenuItems} />
        </MotionPageTransitionFromLeft>
        <Layout
          style={{
            marginLeft: 210,
            scrollbarWidth: "thin",
            gap: 10,
            marginTop: "10px",
            marginRight: "10px",
          }}
        >
          <MotionPageTransitionFromTop>
            <Header
              style={{
                padding: "10px 15px 10px 15px",
                background: theme.colorBgContainer,
                borderRadius: theme.borderRadius,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 20,
              }}
            >
              <div className="flex flex-wrap justify-center items-center gap-5">
                <Button
                  size="large"
                  icon={<NodeCollapseOutlined />}
                  onClick={toggleSidebar}
                >
                  Hide
                </Button>
                <Breadcrumb
                  separator="/"
                  items={[
                    {
                      title: "Administration",
                      href: "/admin/home",
                    },
                    {
                      title: "Users",
                      href: "/admin/users",
                    },
                  ]}
                />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button size="large" icon={<QuestionCircleOutlined />}>
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
                      <MessageOutlined />
                    </Badge>
                  }
                />
                <AvatarProfile />
              </div>
            </Header>
          </MotionPageTransitionFromTop>
          <Content style={{ overflow: "initial" }}>{children}</Content>
        </Layout>
      </Layout>
    </MotionLayout>
  );
}
