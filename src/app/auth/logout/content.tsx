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
    token: { borderRadius },
  } = theme.useToken();

  return (
    <CustomContainerFullHeight>
      <div
        style={{
          borderRadius: borderRadius,
        }}
        className="w-full max-w-[450px] flex flex-col gap-6 items-center justify-center p-8 border"
      >
        <LogoHeader />
        <div className="w-full flex flex-col items-center justify-center">
          <Title level={2}>Successful logged out</Title>
          <span className="text-center">
            Thank you for using Digitschool. You've been successfully
            logged out of your account. Would
            you like to log back in or explore more?
          </span>
        </div>

        <Button
          size="large"
          type="primary"
          htmlType="submit"
          className="w-full"
          onClick={() => router.push("/auth/login")}
        >
          Login Again
        </Button>
      </div>
    </CustomContainerFullHeight>
  );
}
