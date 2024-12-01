"use client";

import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import {
  FacebookFilled,
  GoogleCircleFilled,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons";
import Link from "next/link";

export default function FormLogin() {
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
          placeholder="Password"
        />
      </Form.Item>
      <div className="w-full flex flex-wrap gap-2 justify-between">
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Link href="/auth/forgot/init">Forgot password ?</Link>
      </div>
      <Form.Item>
        <Button
          size="large"
          type="primary"
          htmlType="submit"
          className="w-full"
        >
          Log in
        </Button>
      </Form.Item>
      <Form.Item>
        <p className="text-center text-lg opacity-50">OR</p>
      </Form.Item>
      <div className="w-full flex flex-col gap-2">
        <Form.Item noStyle>
          <Button
            size="large"
            icon={<GoogleCircleFilled />}
            htmlType="submit"
            className="w-full"
          >
            Continue with Google
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            size="large"
            icon={<FacebookFilled />}
            htmlType="submit"
            className="w-full"
          >
            Continue with Facebook
          </Button>
        </Form.Item>
      </div>
      <div className="w-full flex justify-center items-center gap-2">
        Don't have an account? <Link href="/auth/register">Sign up now</Link>
      </div>
    </Form>
  );
}
