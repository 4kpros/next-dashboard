"use client";

import Title from "antd/es/typography/Title";
import FormLogin from "./components/form-login";
import LogoHeader from "../(components)/logo-header";
import { CustomContainerFullHeight } from "@/components/container/custom-container";
import { Button, theme } from "antd";
import { useRouter } from "next/navigation";

export default function PageContent() {
  const router = useRouter();
  const {
    token: { borderRadius },
  } = theme.useToken();

  return (
    <CustomContainerFullHeight>
      <div className="w-full flex flex-col items-center justify-center">
        <div
          style={{
            borderRadius: borderRadius,
          }}
          className="w-full max-w-[450px] flex flex-col items-center justify-center gap-6 border border-none lg:border-solid p-8"
        >
          <LogoHeader />
          <div className="w-full flex flex-col items-center justify-center">
            <Title level={2}>Sign in</Title>
            <span className="text-center">
              Welcome back to Digitschool! Please enter your details below to
              sign in.
            </span>
          </div>
          <FormLogin />
        </div>
        <div className="w-full flex item-center justify-center mt-4">
          <Button
            htmlType="submit"
            color="primary"
            variant="filled"
            onClick={() => router.push("/")}
          >
            Back to the website
          </Button>
        </div>
      </div>
    </CustomContainerFullHeight>
  );
}
