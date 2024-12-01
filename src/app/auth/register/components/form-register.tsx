"use client";

import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import {
  FacebookFilled,
  FacebookOutlined,
  GoogleCircleFilled,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import GoogleIcon from "@/components/icons/boxicons/google";

export default function FormRegister() {
  const onFinish = (values: any) => {
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
      <Form.Item
        name="password1"
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
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item
        name="password2"
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
          placeholder="Confirm password"
        />
      </Form.Item>
      <Form.Item>
        <Button
          size="large"
          type="primary"
          htmlType="submit"
          className="w-full"
        >
          Register
        </Button>
      </Form.Item>
      <div className="w-full flex justify-center items-center gap-2">
        Already have an account? <Link href="/auth/login">Login</Link>
      </div>
    </Form>
  );
}