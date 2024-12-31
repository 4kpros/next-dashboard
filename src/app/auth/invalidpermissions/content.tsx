"use client";

import Title from "antd/es/typography/Title";
import { CustomContainerFullHeight } from "@/components/container/custom-container";
import LogoHeader from "../../../components/header/logo-header";
import { Button } from "antd";
import { theme as antdTheme } from "antd";
import { useRouter } from "next/navigation";

export default function PageContent() {
  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  // React hooks
  const router = useRouter();

  return (
    <CustomContainerFullHeight>
      <div
        style={{
          backgroundColor: theme.colorBgContainer,
          borderRadius: theme.borderRadius,
        }}
        className="w-full max-w-[450px] flex flex-col gap-6 items-center justify-center p-8 border"
      >
        <LogoHeader />
        <div className="w-full flex flex-col items-center justify-center">
          <Title level={2}>Invalid permissions</Title>
          <span className="text-center">
            This means you don&apos;t have the necessary rights to access or use
            this specific feature. It could be due to your account type, the
            settings of the feature, or other restrictions. Please contact your
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
