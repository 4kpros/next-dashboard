"use client";

import Title from "antd/es/typography/Title";
import LogoHeader from "../../../components/header/logo-header";
import { CustomContainerFullHeight } from "@/components/container/custom-container";
import FormRegister from "./components/form-register";
import Image from "next/image";
import { Button, theme as antdTheme } from "antd";
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
          background: theme.colorBgContainer,
          borderRadius: theme.borderRadius,
        }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 border"
      >
        <div
          style={{
            borderRadius: theme.borderRadius,
          }}
          className="w-full"
        >
          <Image
            src={"/images/pages/auth/register.jpg"}
            width={500}
            height={500}
            alt={""}
            style={{
              borderRadius: theme.borderRadius,
            }}
            className="w-full max-w-[400px] h-[500px] object-cover"
          />
        </div>
        <div className="w-full flex flex-col items-center justify-center">
          <div className="w-full max-w-[400px] flex flex-col items-center justify-center gap-8">
            <LogoHeader />
            <div className="w-full flex flex-col items-center justify-center">
              <Title level={2}>Create an account</Title>
              <span className="text-center">
                Welcome back to Digitschool! Please enter your details below to
                sign in.
              </span>
            </div>
            <FormRegister />
          </div>
        </div>
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
