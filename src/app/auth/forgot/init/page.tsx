import Title from "antd/es/typography/Title";
import FormForgotInit from "./components/form-forgot-init";
import LogoHeader from "../../(components)/logo-header";
import { CustomContainerFullHeight } from "@/components/container/custom-container";

export default function Page() {
  return (
    <CustomContainerFullHeight>
      <div className="w-full max-w-[450px] flex flex-col gap-6 items-center justify-center p-8 border">
        <LogoHeader />
        <div className="w-full flex flex-col items-center justify-center">
          <Title level={2}>Forgot password</Title>
          <span className="text-center">
            Enter your email address to receive a password reset code.
          </span>
        </div>
        <FormForgotInit />
      </div>
    </CustomContainerFullHeight>
  );
}
