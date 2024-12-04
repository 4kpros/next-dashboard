"use client";

import Title from "antd/es/typography/Title";
import FormForgotInit from "./components/form-forgot-init";
import LogoHeader from "../../(components)/logo-header";
import { CustomContainerFullHeight } from "@/components/container/custom-container";
import { Button, theme } from "antd";
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
          <Title level={2}>Forgot password</Title>
          <span className="text-center">
            Enter your email address to receive a password reset code.
          </span>
        </div>
        <FormForgotInit />
      </div>
      <div className="w-full flex item-center justify-center mt-4">
        <Button
          htmlType="submit"
          color="primary"
          variant="filled"
          onClick={() => router.push("/")}
        >
          Back to website
        </Button>
      </div>
    </CustomContainerFullHeight>
  );
}
