import { Checkbox, Form } from "antd";

export default function FormItemCheckbox(props: {
  isLoading?: boolean;
  required?: boolean;
  label?: string;
  name?: string;
  defaultValue?: boolean;
}) {
  return (
    <Form.Item
      initialValue={props.defaultValue}
      name={props.name}
      required={props.required}
      valuePropName="checked"
    >
      <Checkbox defaultChecked={props.defaultValue}>{props.label}</Checkbox>
    </Form.Item>
  );
}
