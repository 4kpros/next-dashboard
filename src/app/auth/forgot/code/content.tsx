import Title from "antd/es/typography/Title";
import LogoHeader from "../../(components)/logo-header";
import FormForgotCode from "./components/form-forgot-code";
import { CustomContainerFullHeight } from "@/components/container/custom-container";
import { theme } from "antd";

export default function PageContent() {
  const {
    token: { colorBgContainer, borderRadius },
  } = theme.useToken();

  return (
    <CustomContainerFullHeight>
      <div
        style={{
          background: colorBgContainer,
          borderRadius: borderRadius,
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
        <FormForgotCode />
      </div>
    </CustomContainerFullHeight>
  );
}
