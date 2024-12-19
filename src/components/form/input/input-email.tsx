import { Form, Input } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";

export default function FormItemInputEmail(props: {
  isLoading?: boolean;
  defaultValue?: string;
  size?: SizeType;
}) {
  return (
    <Form.Item
      label="Email"
      name="email"
      initialValue={props.defaultValue}
      rules={[
        {
          type: "email",
          required: true,
          message: "Please enter the email!",
        },
      ]}
    >
      <Input
        disabled={props.isLoading}
        size={props.size ?? "middle"}
        placeholder="Enter the email"
      />
    </Form.Item>
  );
}
