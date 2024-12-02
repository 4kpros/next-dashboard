import { MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, theme } from "antd";
import TextArea from "antd/es/input/TextArea";
import Image from "next/image";
import React from "react";

export default function Contact() {
  const {
    token: { colorFillTertiary, borderRadius },
  } = theme.useToken();

  const handleSubmit = (values: any) => {
    console.log("Received values of form: ", values);
  };
  return (
    <section className="w-full flex flex-col items-center gap-8">
      <h1 className="w-full text-4xl text-center font-semibold">Contact us</h1>
      <div
        style={{
          backgroundColor: colorFillTertiary,
          borderRadius: borderRadius,
        }}
        className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-12 p-6"
      >
        <Image
          style={{
            borderRadius: borderRadius,
          }}
          src={"/images/pages/home/contact.jpg"}
          alt=""
          width={1500}
          height={1500}
          className="w-full h-[400px] object-cover object-center"
        />

        <div className="w-full flex items-center justify-center">
          <div className="w-full max-w-[500px]">
            <Form
              name="cf"
              method="post"
              onFinish={handleSubmit}
              layout="vertical"
            >
              <Form.Item
                label="Don't fill this out"
                className={`hidden`}
                style={{ display: `none` }}
                name="bot-field"
              >
                <Input size="large" type={`hidden`} />
              </Form.Item>

              <Form.Item
                label="Name"
                rules={[{ required: true, message: `Please enter your name.` }]}
                name="name"
              >
                <Input
                  size="large"
                  placeholder="Name"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                />
              </Form.Item>

              <Form.Item
                label="Email"
                rules={[
                  {
                    required: true,
                    type: `email`,
                    message: `Please enter your email.`,
                  },
                ]}
                name="email"
              >
                <Input
                  size="large"
                  placeholder="Your Email"
                  prefix={<MailOutlined className="site-form-item-icon" />}
                />
              </Form.Item>

              <Form.Item
                label="Message"
                rules={[
                  { required: true, message: `Please enter your message.` },
                ]}
                name="message"
              >
                <TextArea placeholder="Your Message" rows={5} />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  disabled={false}
                >
                  Send
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
