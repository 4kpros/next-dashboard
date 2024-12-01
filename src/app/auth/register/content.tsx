"use client";

import Title from "antd/es/typography/Title";
import FormLogin from "./components/form-register";
import LogoHeader from "../(components)/logo-header";
import { CustomContainerFullHeight } from "@/components/container/custom-container";
import FormRegister from "./components/form-register";
import Image from "next/image";
import { Button, theme } from "antd";
import { HomeOutlined } from "@ant-design/icons";
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
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 border"
      >
        <div
          style={{
            borderRadius: borderRadius,
          }}
          className="w-full relative"
        >
          <Image
            src={"/images/pages/auth/register.jpg"}
            width={500}
            height={500}
            alt={""}
            style={{
              borderRadius: borderRadius,
            }}
            className="w-full h-full absolute object-cover"
          />
          <div className="w-full max-w-[400px] h-[500px] flex flex-col z-10">
            <div className="w-full flex justify-start p-4">
              <Button
                type="primary"
                htmlType="submit"
                variant="filled"
                icon={<HomeOutlined/>}
                onClick={() => router.push("/")}
              >
                Back to website
              </Button>
            </div>
          </div>
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
    </CustomContainerFullHeight>
  );
}