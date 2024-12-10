"use client";

import { RoleChoiceRequest } from "@/lib/api/profile/request";
import { Alert, Button, Form, Radio } from "antd";

const options = [
  {
    label: "Parent",
    value: "parent",
    description: "",
    icon: "",
  },
  {
    label: "Student",
    value: "student",
    description: "",
    icon: "",
  },
];

export default function FormRoleChoice(props: {
  isLoading?: boolean;
  errorMessage?: string;
  onSubmit?: (values: RoleChoiceRequest) => void;
}) {
  return (
    <Form<RoleChoiceRequest>
      name="role-choice-form"
      layout={"vertical"}
      onFinish={props.onSubmit}
      autoComplete="on"
      className="w-auto text-center"
    >
      <Form.Item
        name="role"
        rules={[
          {
            required: true,
            message: "Please input your role!",
          },
        ]}
      >
        <Radio.Group
          block
          options={options}
          defaultValue="parent"
          // optionType="button"
          buttonStyle="solid"
          size="large"
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
    </Form>
  );
}
