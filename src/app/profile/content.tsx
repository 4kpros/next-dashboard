"use client";

import { CustomContainerFullHeight } from "@/components/container/custom-container";
import { getDashboardPath } from "@/utils/redirect/dashboard";
import {
  ArrowLeftOutlined,
  DashboardOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Button, theme } from "antd";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function PageContent() {
  const session = useSession();
  const router = useRouter();
  const {
    token: { colorPrimary, colorBgContainer, borderRadius },
  } = theme.useToken();

  const action = () => {
    if (session.status == "authenticated") {
      router.push(getDashboardPath(session?.data?.user?.feature ?? ""));
    }
  };

  return (
    <CustomContainerFullHeight>
      <div
        style={{
          background: colorBgContainer,
          borderRadius: borderRadius,
          backgroundImage:
            "radial-gradient(#ffffff 1.25px, transparent 1.25px)",
          backgroundSize: "25px 25px",
        }}
        className="w-full h-full flex flex-col gap-6 items-center border"
      >
        <div
          style={{
            background: colorPrimary,
            borderTopLeftRadius: borderRadius,
            borderTopRightRadius: borderRadius,
          }}
          className="w-full h-[200px] relative profile-bg"
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
              className="w-full h-full object-cover p-[2px] rounded-full ring-2 ring-gray-300"
            />
          </div>
        </div>
      </div>
    </CustomContainerFullHeight>
  );
}

