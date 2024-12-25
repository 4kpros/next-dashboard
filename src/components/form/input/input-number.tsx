import { Form, Input, InputNumber } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { Rule } from "antd/es/form";

export default function FormItemInputNumber(props: {
  isLoading?: boolean;
  defaultValue?: number;
  label?: string;
  name?: string | string[];
  rules?: Rule[];
  placeholder?: string;
  size?: SizeType;
}) {
  return (
    <Form.Item
      label={props.label}
      name={props.name}
      initialValue={props.defaultValue}
      rules={props.rules}
    >
      <InputNumber
        disabled={props.isLoading}
        size={props.size ?? "middle"}
        placeholder={props.placeholder}
      />
    </Form.Item>
  );
}
