import { Form, Input } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";

export default function FormItemInputEmailDomain(props: {
  isLoading?: boolean;
  defaultValue?: string;
  required?: boolean;
  name?: string | string[];
  size?: SizeType;
}) {
  return (
    <Form.Item
      label="Email domain"
      name={props.name}
      initialValue={props.defaultValue}
      rules={[
        {
          required: props.required,
          message: "Please enter the domain!",
        },
      ]}
    >
      <Input
        disabled={props.isLoading}
        size={props.size ?? "middle"}
        placeholder="Enter the domain"
        addonBefore="@"
        defaultValue="digitschool.cm"
      />
    </Form.Item>
  );
}
