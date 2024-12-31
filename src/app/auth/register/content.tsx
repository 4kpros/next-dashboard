"use client";

import Title from "antd/es/typography/Title";
import LogoHeader from "../../../components/header/logo-header";
import { CustomContainerFullHeight } from "@/components/container/custom-container";
import FormRegister from "./components/form-register";
import Image from "next/image";
import { Button, theme as antdTheme, message } from "antd";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { SignUpEmailRequest } from "@/lib/api/user/auth/request";
import { NoticeType } from "antd/es/message/interface";
import { signUpWithCredentialsEmail } from "@/lib/api/user/auth/routes";
import { HttpMessageFromStatus } from "@/lib/http/status-message";
import { HttpStatusCode } from "axios";

export default function PageContent() {
  // React hooks
  const router = useRouter();

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();
  const [messageApi] = message.useMessage();
  const toastMessage = (type: NoticeType, message: string) => {
    messageApi.open({
      type: type,
      content: message,
    });
  };

  // Tanstack hooks
  const mutationSignUp = useMutation({
    mutationFn: async (values: SignUpEmailRequest) =>
      signUpWithCredentialsEmail(values),
    onSuccess(data, _variables, _context) {
      toastMessage(
        "success",
        "Welcome dude! You will need to activate your account to use our services."
      );
      router.push(`/auth/activate?token=${data.data?.activateAccountToken}`);
    },
  });

  return (
    <>
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
              backgroundColor: theme.colorFill,
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
                  Welcome back to Digitschool! Please enter your details below
                  to sign in.
                </span>
              </div>
              <FormRegister
                isLoading={mutationSignUp.isPending}
                errorMessage={
                  mutationSignUp.isError
                    ? HttpMessageFromStatus(
                        (mutationSignUp.error as any)?.response?.data?.status ??
                          HttpStatusCode.InternalServerError,
                        "email"
                      )
                    : undefined
                }
                onSubmit={(values) => {
                  mutationSignUp.mutate(values);
                }}
              />
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
    </>
  );
}
