"use client";

import Title from "antd/es/typography/Title";
import FormLogin, { FormLoginType } from "./components/form-login";
import LogoHeader from "../../../components/header/logo-header";
import { CustomContainerFullHeight } from "@/components/container/custom-container";
import { Button, theme } from "antd";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

export default function PageContent() {
  const router = useRouter();
  const {
    token: { colorBgContainer, borderRadius },
  } = theme.useToken();

  const signInWithCredentialMutation = useMutation({
    mutationFn: (formData: FormLoginType) => {
      return signIn("credentials", {
        redirect: true,
        redirectTo: "/",
        email: formData.email,
        password: formData.password,
        stayConnected: formData.remember,
      });
    },
  });

  const onSubmitGoogleMutation = useMutation({
    mutationFn: () => {
      return signIn("google", {
        redirect: true,
        redirectTo: "/",
      });
    },
  });

  return (
    <CustomContainerFullHeight>
      <div className="w-full flex flex-col items-center justify-center">
        <div
          style={{
            backgroundColor: colorBgContainer,
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
          <FormLogin
            isLoading={signInWithCredentialMutation.isPending}
            onSubmitCredentials={(formData) =>
              signInWithCredentialMutation.mutate(formData)
            }
            onSubmitGoogle={() => onSubmitGoogleMutation.mutate()}
          />
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
      </div>
    </CustomContainerFullHeight>
  );
}
