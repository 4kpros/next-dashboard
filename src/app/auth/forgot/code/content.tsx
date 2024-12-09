"use client";

import Title from "antd/es/typography/Title";
import { CustomContainerFullHeight } from "@/components/container/custom-container";
import { theme as antdTheme, message } from "antd";
import { useMutation } from "@tanstack/react-query";
import { HttpMessageFromStatus } from "@/lib/http/status-message";
import { HttpStatusCode } from "axios";
import { useRouter } from "next/navigation";
import LogoHeader from "@/components/header/logo-header";
import FormForgotCode from "./components/form-forgot-code";
import { getSearchParam } from "@/helpers/url/search-param";
import { forgotPasswordCode } from "@/lib/api/auth/routes";
import { ForgotCodeRequest } from "@/lib/api/auth/request";
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
    mutationFn: async (values: ForgotCodeRequest) => forgotPasswordCode(values),
    onSuccess(data, _variables, _context) {
      toastMessage(
        "success",
        "Code checked! Now you will need to set a new password."
      );
      console.log(data);
      router.push(`/auth/forgot/newpassword?token=${data.data?.token}`);
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
            <Title level={2}>Forgot password - step 2</Title>
            <span className="text-center">
              Enter your received code to your email/phone number.
            </span>
          </div>
          <FormForgotCode
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
              let newValues = values;
              newValues.code = Number(values.code);
              newValues.token =
                getSearchParam(window.location.href, "token") ?? undefined;
              mutationForgot.mutate(newValues);
            }}
          />
        </div>
      </CustomContainerFullHeight>
    </>
  );
}
