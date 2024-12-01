"use client";

import Title from "antd/es/typography/Title";
import FormLogin from "./components/form-login";
import LogoHeader from "../(components)/logo-header";
import { CustomContainerFullHeight } from "@/components/container/custom-container";
import { theme } from "antd";

export default function PageContent() {
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
          <Title level={2}>Sign in</Title>
          <span className="text-center">
            Welcome back to Digitschool! Please enter your details below to sign
            in.
          </span>
        </div>
        <FormLogin />
      </div>
    </CustomContainerFullHeight>
  );
}
