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
    token: {  colorBgContainer,borderRadius },
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
          <Title level={2}>Authentication error</Title>
          <span className="text-center">
            We were unable to verify your credentials. Please ensure that you
            have entered the correct username and password.
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
