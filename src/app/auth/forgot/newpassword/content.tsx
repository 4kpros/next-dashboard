"use client";

import Title from "antd/es/typography/Title";
import LogoHeader from "../../../../components/header/logo-header";
import FormForgotNewPassword from "./components/form-forgot-new-password";
import { CustomContainerFullHeight } from "@/components/container/custom-container";
import { theme as antdTheme } from "antd";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { ForgotNewPasswordRequest } from "@/lib/api/auth/request";
import { forgotPasswordNewPassword } from "@/lib/api/auth/routes";
import { HttpMessageFromStatus } from "@/lib/http/status-message";
import { HttpStatusCode } from "axios";
import { getSearchParam } from "@/helpers/url/search-param";

export default function PageContent() {
  // React hooks
  const router = useRouter();

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  // Tanstack hooks
  const mutationForgot = useMutation({
    mutationFn: async (values: ForgotNewPasswordRequest) =>
      forgotPasswordNewPassword(values),
    onSuccess(_data, _variables, _context) {
      router.push(`/auth/forgot/success`);
    },
  });

  return (
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
          <Title level={2}>Forgot password - step 3</Title>
          <span className="text-center">Enter your new password.</span>
        </div>
        <FormForgotNewPassword
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
            const newValues = values;
            newValues.token =
              getSearchParam(window.location.href, "token") ?? undefined;
            mutationForgot.mutate(newValues);
          }}
        />
      </div>
    </CustomContainerFullHeight>
  );
}
