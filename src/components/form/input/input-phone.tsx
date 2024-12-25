import { Form, Input } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";

export default function FormItemInputPhone(props: {
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
          required: props.required,
          message: "Please enter the phone number!",
        },
      ]}
    >
      <Input
        disabled={props.isLoading}
        size={props.size ?? "middle"}
        placeholder="With country code. E.g. 237690909090"
      />
    </Form.Item>
  );
}
