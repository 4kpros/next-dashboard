"use client";

import FormModalFooter from "@/components/form/form-modal-footer";
import { UserRequest } from "@/lib/api/user/request";
import { UserResponse } from "@/lib/api/user/response";
import { Alert, Form, Input, Select } from "antd";

export default function FormUpdateUser(props: {
  isLoading?: boolean;
  user?: UserResponse | null;
  canSubmit?: boolean;
  canSubmitMessage?: string;
  errorMessage?: string;
  onValuesChange?: (values: UserRequest) => void;
  onSubmit: (values: UserRequest) => void;
  onCancel: () => void;
}) {
  return (
    <Form<UserRequest>
      name="update-user-form"
      layout={"vertical"}
      onFinish={props.onSubmit}
      onValuesChange={(_changed, values) => {
        props.onValuesChange!(values);
      }}
      autoComplete="on"
    >
      <br />
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            type: "email",
            required: true,
            message: "Please enter the email!",
          },
        ]}
      >
        <Input size="large" placeholder="Enter the email" />
      </Form.Item>
      <Form.Item
        key={"user-add-method-phone"}
        label="Phone number"
        name="phoneNumber"
        rules={[
          {
            type: "string",
            required: true,
            message: "Please enter the phone number!",
          },
        ]}
      >
        <Input
          size="large"
          placeholder="With country code. E.g. 237690909090"
        />
      </Form.Item>

      <Form.Item
        label="Role"
        name="userId"
        rules={[
          {
            required: true,
            message: "Please select the user!",
          },
        ]}
      >
        <Select size="large" placeholder="Select the user">
          <Select.Option key={"user-add-user-0"} value="0">
            Admin
          </Select.Option>
          <Select.Option key={"user-add-user-1"} value="1">
            Admin assist
          </Select.Option>
          <Select.Option key={"user-add-user-2"} value="2">
            Director
          </Select.Option>
          <Select.Option key={"user-add-user-3"} value="3">
            Director assist
          </Select.Option>
          <Select.Option key={"user-add-user-4"} value="4">
            Teacher
          </Select.Option>
          <Select.Option key={"user-add-user-5"} value="5">
            Student
          </Select.Option>
        </Select>
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
      {props.canSubmitMessage && props.canSubmitMessage.length > 0 ? (
        <div className="w-full flex items-center justify-end">
          <p className="w-auto text-end opacity-75">{props.canSubmitMessage}</p>
        </div>
      ) : null}
      <FormModalFooter
        isLoading={props.isLoading}
        canSubmit={props.canSubmit}
        onCancel={props.onCancel}
      />
    </Form>
  );
}
