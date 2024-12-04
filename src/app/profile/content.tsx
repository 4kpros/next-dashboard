"use client";

import { CustomContainerFullHeight } from "@/components/container/custom-container";
import { getDashboardPath } from "@/utils/redirect/dashboard";
import { DashboardOutlined, EditOutlined } from "@ant-design/icons";
import { Button, theme as antdTheme } from "antd";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import UserProfile from "./(components)/user-profile";
import UserSettings from "./(components)/user-settings";

export default function PageContent() {
  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  // React hooks
  const router = useRouter();

  // Next hooks
  const session = useSession();

  const action = () => {
    if (session.status == "authenticated") {
      router.push(getDashboardPath(session?.data?.user?.feature ?? ""));
    }
  };

  return (
    <CustomContainerFullHeight>
      <div
        style={{
          backgroundColor: theme.colorBgContainer,
          borderRadius: theme.borderRadius,
        }}
        className="w-full h-full flex flex-col gap-6 items-center border"
      >
        <div
          style={{
            backgroundColor: theme.colorPrimary,
            borderTopLeftRadius: theme.borderRadius,
            borderTopRightRadius: theme.borderRadius,
            backgroundImage:
              "radial-gradient(#ffffff4f 1.25px, transparent 1.25px)",
            backgroundSize: "25px 25px",
          }}
          className="w-full h-[200px] relative"
        >
          <div className="w-full absolute top-0 left-0 flex flex-wrap justify-between gap-4 p-4">
            <Button
              htmlType="submit"
              onClick={action}
              icon={<DashboardOutlined />}
            >
              Dashboard
            </Button>
            <Button
              htmlType="submit"
              onClick={() => router.push("/profile/edit")}
              icon={<EditOutlined />}
            >
              Edit
            </Button>
          </div>
          <div className="w-32 h-32 absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <Image
              src={"/images/pages/auth/register.jpg"}
              width={256}
              height={256}
              alt={""}
              className="w-full h-full object-cover p-[2px] rounded-full ring-2 ring-gray-400"
            />
          </div>
        </div>
        <div className="w-full flex flex-col items-center justify-center mt-12">
          <h3 className="text-2xl font-semibold leading-normal">
            Jenna Stones
          </h3>
          <p className="text-lg leading-normal opacity-75">
            {session.status == "loading"
              ? "..."
              : session.data?.user?.role ?? "..."}
          </p>
        </div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-4 px-4 mt-6 mb-4">
          <div
            style={{
              borderRadius: theme.borderRadius,
            }}
            className="w-full h-full flex flex-col border"
          >
            <UserProfile />
          </div>
          <div
            style={{
              borderRadius: theme.borderRadius,
            }}
            className="w-full h-full flex flex-col border"
          >
            <UserSettings />
          </div>
        </div>
      </div>
    </CustomContainerFullHeight>
  );
}
