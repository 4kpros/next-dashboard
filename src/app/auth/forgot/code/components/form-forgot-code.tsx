"use client";

import React from "react";
import { Form, Input, Button } from "antd";
import {
  LockOutlined,
} from "@ant-design/icons";
import Link from "next/link";

export default function FormForgotCode() {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Form
      name="login-form"
      className="w-full"
      initialValues={{
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="code"
        rules={[
          {
            required: true,
            message: "Please input your code!",
          },
        ]}
      >
        <Input
          size="large"
          prefix={<LockOutlined />}
          type="number"
          placeholder="Code"
        />
      </Form.Item>
      <Form.Item>
        <Button
          size="large"
          type="primary"
          htmlType="submit"
          className="w-full"
        >
          Check
        </Button>
      </Form.Item>
      <div className="w-full flex justify-center items-center gap-2">
        Already have an account? <Link href="/auth/login">Login</Link>
      </div>
    </Form>
  );
}
