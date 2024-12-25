"use client";

import Title from "antd/es/typography/Title";
import FormForgotInit from "./components/form-forgot-init";
import LogoHeader from "../../../../components/header/logo-header";
import { CustomContainerFullHeight } from "@/components/container/custom-container";
import { Button, theme as antdTheme, message } from "antd";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { ForgotInitEmailRequest } from "@/lib/api/user/auth/request";
import { forgotPasswordInitEmail } from "@/lib/api/user/auth/routes";
import { HttpMessageFromStatus } from "@/lib/http/status-message";
import { HttpStatusCode } from "axios";
import { NoticeType } from "antd/es/message/interface";

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
  const mutationForgot = useMutation({
    mutationFn: async (values: ForgotInitEmailRequest) =>
      forgotPasswordInitEmail(values),
    onSuccess(data, _variables, _context) {
      toastMessage(
        "success",
        "Code sent to your email! PLease check your email and get the received code."
      );
      router.push(`/auth/forgot/code?token=${data.data?.token}`);
    },
  });

  return (
    <>
      <CustomContainerFullHeight>
        <div
          style={{
            backgroundColor: theme.colorBgContainer,
            borderRadius: theme.borderRadius,
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
          <FormForgotInit
            isLoading={mutationForgot.isPending}
            errorMessage={
              mutationForgot.isError
                ? HttpMessageFromStatus(
                    (mutationForgot.error as any)?.response?.data?.status ??
                      HttpStatusCode.InternalServerError,
                    "user"
                  )
                : undefined
            }
            onSubmit={(values) => {
              mutationForgot.mutate(values);
            }}
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
      </CustomContainerFullHeight>
    </>
  );
}
