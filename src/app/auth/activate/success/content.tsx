"use client";

import Title from "antd/es/typography/Title";
import { CustomContainerFullHeight } from "@/components/container/custom-container";
import { Button } from "antd";
import { theme as antdTheme } from "antd";
import { useRouter } from "next/navigation";
import LogoHeader from "@/components/header/logo-header";

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
        <div className="w-full flex flex-col items-center justify-center text-center">
          <Title level={2}>Account successful activated</Title>
          <span className="text-center">
            You can now access all the features and enjoy our services. Welcome
            aboard, and thank you for joining us!
          </span>
        </div>

        <div className="w-full flex flex-col items-center justify-center gap-2">
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className="w-full"
            onClick={() => router.push("/auth/login")}
          >
            Sign in
          </Button>

          <Button
            size="large"
            htmlType="submit"
            className="w-full"
            onClick={() => router.push("/")}
          >
            Back to website
          </Button>
        </div>
      </div>
    </CustomContainerFullHeight>
  );
}
