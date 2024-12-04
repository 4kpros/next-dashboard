"use client";

import React from "react";
import { Form, Input, Button } from "antd";
import { MailOutlined } from "@ant-design/icons";
import Link from "next/link";

interface FormForgotInitType {
  email: string;
}

export default function FormForgotInit() {
  const onFinish = (values: FormForgotInitType) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Form
      name="login-form"
      className="w-full"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your Email!",
          },
        ]}
      >
        <Input
          size="large"
          prefix={<MailOutlined />}
          type="email"
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item>
        <Button
          size="large"
          type="primary"
          htmlType="submit"
          className="w-full"
        >
          Send code
        </Button>
      </Form.Item>
      <div className="w-full flex justify-center items-center gap-2">
        Already have an account? <Link href="/auth/login">Login</Link>
      </div>
    </Form>
  );
}
