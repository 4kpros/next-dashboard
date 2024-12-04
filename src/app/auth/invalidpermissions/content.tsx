"use client";

import Title from "antd/es/typography/Title";
import { CustomContainerFullHeight } from "@/components/container/custom-container";
import LogoHeader from "../(components)/logo-header";
import { Button } from "antd";
import { theme } from "antd";
import { useRouter } from "next/navigation";

export default function PageContent() {
  const router = useRouter();
  const {
    token: { colorBgContainer, borderRadius },
  } = theme.useToken();

  return (
    <CustomContainerFullHeight>
      <div
        style={{
          background: colorBgContainer,
          borderRadius: borderRadius,
        }}
        className="w-full max-w-[450px] flex flex-col gap-6 items-center justify-center p-8 border"
      >
        <LogoHeader />
        <div className="w-full flex flex-col items-center justify-center">
          <Title level={2}>Invalid permissions</Title>
          <span className="text-center">
            This means you don't have the necessary rights to access or use this
            specific feature. It could be due to your account type, the settings
            of the feature, or other restrictions. Please contact your
            administrator if you need further assistance.
          </span>
        </div>

        <div className="w-full flex flex-col items-center justify-center gap-2">
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className="w-full"
            onClick={() => router.push("/")}
          >
            Go to home page
          </Button>

          <Button
            size="large"
            htmlType="submit"
            className="w-full"
            onClick={() => router.push("/#contact")}
          >
            Contact us
          </Button>
        </div>
      </div>
    </CustomContainerFullHeight>
  );
}
