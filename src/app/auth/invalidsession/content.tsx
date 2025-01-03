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
          borderRadius: theme.borderRadius,
        }}
        className="w-full max-w-[450px] flex flex-col gap-6 items-center justify-center p-8 border"
      >
        <LogoHeader />
        <div className="w-full flex flex-col items-center justify-center">
          <Title level={2}>Session timeout</Title>
          <span className="text-center">
            To enhance security, we&apos;ve implemented a session timeout of 60
            minutes to 30 days on all user accounts. This helps protect user
            data in case a computer is left unattended.
          </span>
        </div>

        <Button
          size="large"
          type="primary"
          htmlType="submit"
          className="w-full"
          onClick={() => router.push("/auth/login")}
        >
          Go to login page
        </Button>
      </div>
    </CustomContainerFullHeight>
  );
}
