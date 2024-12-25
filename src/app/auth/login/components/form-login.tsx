import { Form, Input, Button, Checkbox } from "antd";
import {
  GoogleCircleFilled,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useGoogleLogin } from "@react-oauth/google";
import { SignInEmailRequest } from "@/lib/api/user/auth/request";
import FormItemCheckbox from "@/components/form/checkbox/checkbox";

export default function FormLogin(props: {
  onSubmitCredentials?: (values: SignInEmailRequest) => void;
  onSubmitGoogle?: () => void;
  isLoading: boolean;
}) {
  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async () => {
      props.onSubmitGoogle!();
    },
  });

  return (
    <Form<SignInEmailRequest>
      name="login-form"
      layout={"vertical"}
      initialValues={{
        stayConnected: true,
      }}
      onFinish={props.onSubmitCredentials}
      autoComplete="on"
      className="w-full"
    >
      <Form.Item
        name="email"
        rules={[
          {
            type: "email",
            message: "The input is not valid email!",
          },
          {
            required: true,
            message: "Please input your email!",
          },
        ]}
      >
        <Input
          disabled={props.isLoading}
          size="large"
          prefix={<MailOutlined />}
          type="email"
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password
          disabled={props.isLoading}
          size="large"
          prefix={<LockOutlined />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <FormItemCheckbox
        isLoading={props.isLoading}
        required={true}
        label="Remember me"
        name="stayConnected"
      />
      <Form.Item>
        <Button
          loading={props.isLoading}
          size="large"
          type="primary"
          htmlType="submit"
          className="w-full"
        >
          Log in
        </Button>
      </Form.Item>
      <div className="w-full flex items-center justify-center">
        <Link href="/auth/forgot/init">Forgot password ?</Link>
      </div>
      <p className="text-center text-lg opacity-50 my-2">OR</p>
      <Form.Item>
        <Button
          disabled={props.isLoading}
          onClick={() => googleLogin()}
          size="large"
          icon={<GoogleCircleFilled />}
          className="w-full"
        >
          Continue with Google
        </Button>
      </Form.Item>
      <div className="w-full flex justify-center items-center gap-2">
        Don&apos;t have an account?{" "}
        <Link href="/auth/register">Sign up now</Link>
      </div>
    </Form>
  );
}
