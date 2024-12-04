import Title from "antd/es/typography/Title";
import LogoHeader from "../../../components/header/logo-header";
import { CustomContainerFullHeight } from "@/components/container/custom-container";
import { theme } from "antd";
import FormActivateAccount from "./components/form-auth-activate";

export default function PageContent() {
  const {
    token: { colorBgContainer, borderRadius },
  } = theme.useToken();

  return (
    <CustomContainerFullHeight>
      <div
        style={{
          backgroundColor: colorBgContainer,
          borderRadius: borderRadius,
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
