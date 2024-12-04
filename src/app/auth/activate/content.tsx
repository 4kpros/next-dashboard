import Title from "antd/es/typography/Title";
import LogoHeader from "../../../components/header/logo-header";
import { CustomContainerFullHeight } from "@/components/container/custom-container";
import { theme as antdTheme } from "antd";
import FormActivateAccount from "./components/form-auth-activate";

export default function PageContent() {
  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

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
          <Title level={2}>Activate your account</Title>
          <span className="text-center">
            Enter your received code to your email/phone number.
          </span>
        </div>
        <FormActivateAccount />
      </div>
    </CustomContainerFullHeight>
  );
}
