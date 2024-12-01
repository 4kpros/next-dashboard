import Title from "antd/es/typography/Title";
import FormLogin from "./components/form-login";
import { CustomContainerFullHeight } from "@/components/container/custom-container";

export default function Page() {
  return (
    <CustomContainerFullHeight>
      <div className="w-full max-w-[450px] flex flex-col gap-6 items-center justify-center p-8 border">
        {/* <Image /> */}
        <div className="w-full flex flex-col items-center justify-center">
          <Title level={2}>Login</Title>
          <span className="text-center">
            Welcome back to Digitschool! Please enter your details below to sign
            in.
          </span>
        </div>
        <FormLogin />
      </div>
    </CustomContainerFullHeight>
  );
}
