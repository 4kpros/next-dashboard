import FormModalFooter from "@/components/form/form-modal-footer";
import { MailFilled, PhoneFilled } from "@ant-design/icons";
import { DatePicker, Form, Input, Segmented, Select } from "antd";

type FormUpdateInfoType = {
  firstName?: string;
  lastName?: string;
  birthday?: Date;
  birthLocation?: string;
  address?: string;
  language?: string;
};

export default function FormUpdateProfileInfo(props: {
  profileInfo?: string;
  onSubmit?: (values: FormUpdateInfoType) => void;
  onCancel?: () => void;
}) {
  return (
    <Form<FormUpdateInfoType>
      name="update-profile-info"
      layout={"vertical"}
      style={{ maxWidth: 600 }}
      onFinish={props.onSubmit}
      autoComplete="on"
    >
      <br></br>
      <Form.Item
        label="First name"
        name="firstName"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Input size="middle" placeholder="First name" />
      </Form.Item>

      <Form.Item
        label="Last name"
        name="lastName"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Input size="middle" placeholder="Last name" />
      </Form.Item>

      <Form.Item
        label="Birthday"
        name="birthday"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <DatePicker size="middle" />
      </Form.Item>

      <Form.Item
        label="Birth location"
        name="birthLocation"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Input size="middle" placeholder="Birth location" />
      </Form.Item>

      <Form.Item
        label="Address"
        name="address"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Input size="middle" placeholder="Address" />
      </Form.Item>

      <Form.Item
        label="Language"
        name="language"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Select size="middle" defaultValue={"en"}>
          <Select.Option value="en">English</Select.Option>
          <Select.Option value="fr">French</Select.Option>
        </Select>
      </Form.Item>

      <FormModalFooter onCancel={props.onCancel} />
    </Form>
  );
}
