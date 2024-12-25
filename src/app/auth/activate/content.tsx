"use client";

import Title from "antd/es/typography/Title";
import LogoHeader from "../../../components/header/logo-header";
import { CustomContainerFullHeight } from "@/components/container/custom-container";
import { theme as antdTheme, message } from "antd";
import FormActivateAccount from "./(components)/form-auth-activate";
import { useMutation } from "@tanstack/react-query";
import { ActivateRequest } from "@/lib/api/user/auth/request";
import { activateAccount } from "@/lib/api/user/auth/routes";
import { HttpMessageFromStatus } from "@/lib/http/status-message";
import { HttpStatusCode } from "axios";
import { useRouter } from "next/navigation";
import { getSearchParam } from "@/helpers/url/search-param";

export default function PageContent() {
  // React hooks
  const router = useRouter();

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  // Tanstack hooks
  const mutationActivate = useMutation({
    mutationFn: async (values: ActivateRequest) => activateAccount(values),
    onSuccess(_data, _variables, _context) {
      router.push(`/auth/activate/success`);
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
            <Title level={2}>Activate your account</Title>
            <span className="text-center">
              Enter your received code to your email/phone number.
            </span>
          </div>
          <FormActivateAccount
            isLoading={mutationActivate.isPending}
            errorMessage={
              mutationActivate.isError
                ? HttpMessageFromStatus(
                    (mutationActivate.error as any)?.response?.data?.status ??
                      HttpStatusCode.InternalServerError,
                    "user"
                  )
                : undefined
            }
            onSubmit={(values) => {
              const newValues = values;
              newValues.code = Number(values.code);
              newValues.token =
                getSearchParam(window.location.href, "token") ?? undefined;
              mutationActivate.mutate(newValues);
            }}
          />
        </div>
      </CustomContainerFullHeight>
    </>
  );
}
