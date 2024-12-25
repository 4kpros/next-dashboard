import { Form, Input } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";

export default function FormItemInputEmail(props: {
  name?: string | string[];
  label?: string;
  isLoading?: boolean;
  defaultValue?: string;
  required?: boolean;
  size?: SizeType;
}) {
  return (
    <Form.Item
      label={props.label}
      name={props.name}
      initialValue={props.defaultValue}
      rules={[
        {
          type: "email",
          required: props.required,
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
