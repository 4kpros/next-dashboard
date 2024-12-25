import FormModalFooter from "@/components/form/form-modal-footer";
import { ProfileRequest } from "@/lib/api/user/profile/request";
import { ProfileResponse } from "@/lib/api/user/profile/response";
import { DatePicker, Form, Input, Select } from "antd";

export default function FormUpdateProfileInfo(props: {
  isLoading?: boolean;
  canSubmit?: boolean;
  profile?: ProfileResponse;
  onValuesChange?: (values: ProfileRequest) => void;
  onSubmit?: (values: ProfileRequest) => void;
  onCancel?: () => void;
}) {
  return (
    <Form<ProfileRequest>
      name="update-profile-info"
      layout={"vertical"}
      style={{ maxWidth: 600 }}
      onValuesChange={(_changed, values) => {
        props.onValuesChange!(values);
      }}
      onFinish={props.onSubmit}
      autoComplete="on"
    >
      <br></br>
      <Form.Item
        label="First name"
        name="firstName"
        initialValue={props.profile?.info?.firstName}
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Input
          disabled={props.isLoading}
          size="middle"
          placeholder="First name"
        />
      </Form.Item>

      <Form.Item
        label="Last name"
        name="lastName"
        initialValue={props.profile?.info?.lastName}
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Input
          disabled={props.isLoading}
          size="middle"
          placeholder="Last name"
        />
      </Form.Item>

      <Form.Item
        label="Birthday"
        name="birthday"
        initialValue={props.profile?.info?.birthday}
        rules={[
          {
            required: false,
          },
        ]}
      >
        <DatePicker disabled={props.isLoading} size="middle" />
      </Form.Item>

      <Form.Item
        label="Birth location"
        name="birthLocation"
        initialValue={props.profile?.info?.birthLocation}
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Input
          disabled={props.isLoading}
          size="middle"
          placeholder="Birth location"
        />
      </Form.Item>

      <Form.Item
        label="Address"
        name="address"
        initialValue={props.profile?.info?.address}
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Input disabled={props.isLoading} size="middle" placeholder="Address" />
      </Form.Item>

      <Form.Item
        label="Language"
        name="language"
        initialValue={props.profile?.info?.language}
        rules={[
          {
            required: true,
            message: "Please input your language!",
          },
        ]}
      >
        <Select disabled={props.isLoading} size="middle">
          <Select.Option value="en">English</Select.Option>
          <Select.Option value="fr">French</Select.Option>
        </Select>
      </Form.Item>

      <FormModalFooter
        isLoading={props.isLoading}
        canSubmit={props.canSubmit}
        onCancel={props.onCancel}
      />
    </Form>
  );
}
