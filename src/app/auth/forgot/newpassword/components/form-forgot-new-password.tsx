"use client";

import React from "react";
import { Form, Input, Button } from "antd";
import { LockOutlined } from "@ant-design/icons";
import Link from "next/link";

interface FormForgotNewPasswordType {
  password: string;
  confirmPassword: string;
}

export default function FormForgotNewPassword() {
  const onFinish = (values: FormForgotNewPasswordType) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Form
      name="login-form"
      className="w-full"
      initialValues={{}}
      onFinish={onFinish}
    >
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input
          size="large"
          prefix={<LockOutlined />}
          type="password"
          placeholder="New password"
        />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input
          size="large"
          prefix={<LockOutlined />}
          type="password"
          placeholder="Confirm new password"
        />
      </Form.Item>
      <Form.Item>
        <Button
          size="large"
          type="primary"
          htmlType="submit"
          className="w-full"
        >
          Save
        </Button>
      </Form.Item>
      <div className="w-full flex justify-center items-center gap-2">
        Already have an account? <Link href="/auth/login">Login</Link>
      </div>
    </Form>
  );
}
