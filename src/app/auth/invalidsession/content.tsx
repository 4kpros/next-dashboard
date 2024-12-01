"use client";

import Title from "antd/es/typography/Title";
import { CustomContainerFullHeight } from "@/components/container/custom-container";
import LogoHeader from "../(components)/logo-header";
import { Button } from "antd";
import { theme } from "antd";

export default function PageContent() {
  const {
    token: { borderRadius },
  } = theme.useToken();

  const navigateToLoginPage = () => {};

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
          <Title level={2}>Session timeout</Title>
          <span className="text-center">
            Enter your received code to your email/phone number.
          </span>
        </div>

        <Button
          size="large"
          type="primary"
          htmlType="submit"
          className="w-full"
          onClick={navigateToLoginPage}
        >
          Go to login page
        </Button>
      </div>
    </CustomContainerFullHeight>
  );
}
