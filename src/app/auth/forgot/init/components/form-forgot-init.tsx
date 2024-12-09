import { Form, Input, Button, Alert } from "antd";
import { MailOutlined } from "@ant-design/icons";
import Link from "next/link";
import { ForgotInitEmailRequest } from "@/lib/api/auth/request";

export default function FormForgotInit(props: {
  isLoading?: boolean;
  errorMessage?: string;
  onSubmit?: (values: ForgotInitEmailRequest) => void;
}) {
  return (
    <Form<ForgotInitEmailRequest>
      name="forgot-init-form"
      layout={"vertical"}
      onFinish={props.onSubmit}
      autoComplete="on"
      className="w-full text-center"
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your Email!",
          },
        ]}
      >
        <Input
          size="large"
          prefix={<MailOutlined />}
          type="email"
          placeholder="Email"
        />
      </Form.Item>
      <br />
      <Alert
        showIcon={false}
        style={{
          height:
            props.errorMessage && props.errorMessage.length > 0
              ? "auto"
              : "0px",
          padding:
            props.errorMessage && props.errorMessage.length > 0
              ? "8px 12px"
              : "0px",
          borderWidth:
            props.errorMessage && props.errorMessage.length > 0 ? "1px" : "0px",
          marginBottom:
            props.errorMessage && props.errorMessage.length > 0
              ? "10px"
              : "0px",
        }}
        message={
          props.errorMessage && props.errorMessage.length > 0
            ? props.errorMessage
            : undefined
        }
        type="error"
        className="transition-all duration-150 ease-in-out"
      />
      <Form.Item>
        <Button
          loading={props.isLoading}
          size="large"
          type="primary"
          htmlType="submit"
          className="w-full"
        >
          Validate
        </Button>
      </Form.Item>
      <div className="w-full flex justify-center items-center gap-2">
        Already have an account? <Link href="/auth/login">Login</Link>
      </div>
    </Form>
  );
}
