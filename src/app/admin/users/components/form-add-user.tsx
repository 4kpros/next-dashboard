"use client";

import defaultFormLayout from "@/components/form/form-layout";
import FormModalFooter from "@/components/form/form-modal-footer";
import { Form, Input, Segmented, Select } from "antd";
import React, { useState } from "react";

type AddUserInputsType = {
  email?: string;
  phoneNumber?: string;
  roleId?: string;
};

export default function FormAddUser(props: {
  onSubmit: () => void;
  onCancel: () => void;
}) {
  const [addMethod, setAddMethod] = useState("Email");

  const onFormValuesChange = (changedValues: { addMethod: string | null } | null) => {
    const newMethod =  changedValues?.addMethod ?? null
    if (newMethod != null && newMethod != addMethod) {
      setAddMethod(newMethod);
    }
  };

  return (
    <Form
      name="add-user-form"
      layout={defaultFormLayout}
      style={{ maxWidth: 600 }}
      initialValues={{ layout: defaultFormLayout }}
      onValuesChange={onFormValuesChange}
      onFinish={() => {}}
      onFinishFailed={() => {}}
      autoComplete="on"
    >
      <br></br>
      <Form.Item
        initialValue={addMethod}
        label="Add user using"
        name="addMethod"
      >
        <Segmented options={["Email", "Phone number"]} />
      </Form.Item>
      <br></br>

      {addMethod == "Email" ? (
        <Form.Item<AddUserInputsType>
          key={"user-add-method-email"}
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input size="large" placeholder="Enter the email" />
        </Form.Item>
      ) : (
        <Form.Item<AddUserInputsType>
          key={"user-add-method-phone"}
          label="Phone number"
          name="phoneNumber"
          rules={[
            {
              type: "string",
              required: true,
              message: "Please input your phone number!",
            },
          ]}
        >
          <Input
            size="large"
            placeholder="With country code. E.g. 237690909090"
          />
        </Form.Item>
      )}

      <Form.Item<AddUserInputsType>
        key={"user-add-role"}
        label="Role"
        name="roleId"
        rules={[
          {
            required: true,
            message: "Please select the role!",
          },
        ]}
      >
        <Select size="large" placeholder="Select the role">
          <Select.Option key={"user-add-role-1"} value="0">
            Admin
          </Select.Option>
          <Select.Option key={"user-add-role-2"} value="1">
            Admin assist
          </Select.Option>
          <Select.Option key={"user-add-role-3"} value="2">
            Director
          </Select.Option>
          <Select.Option key={"user-add-role-4"} value="3">
            Director assist
          </Select.Option>
          <Select.Option key={"user-add-role-5"} value="3">
            Teacher
          </Select.Option>
          <Select.Option key={"user-add-role-6"} value="3">
            Student
          </Select.Option>
        </Select>
      </Form.Item>
      <br></br>
      <FormModalFooter onCancel={props.onCancel} onSubmit={props.onSubmit} />
    </Form>
  );
}
