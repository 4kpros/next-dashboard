import { Form, Input } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";

export default function FormItemInputPhone(props: {
  isLoading?: boolean;
  defaultValue?: string;
  size?: SizeType;
}) {
  return (
    <Form.Item
      label="Phone number"
      name="phoneNumber"
      initialValue={props.defaultValue}
      rules={[
        {
          type: "string",
          required: true,
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
