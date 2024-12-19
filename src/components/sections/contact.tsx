"use client";

import { Alert, App, Button, Form, Input, theme as antdTheme } from "antd";
import TextArea from "antd/es/input/TextArea";
import HelpIcon from "../icons/material/help";
import { ContactRequest } from "@/lib/api/contact/request";
import { useMutation } from "@tanstack/react-query";
import { NoticeType } from "antd/es/message/interface";
import { postContact } from "@/lib/api/contact/routes";

export default function Contact() {
  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  // Ant design hooks
  const { message: messageInst } = App.useApp();
  const toastMessage = (type: NoticeType, message: string) => {
    messageInst.open({
      type: type,
      content: message,
    });
  };

  // Tanstack hooks
  const mutationAdd = useMutation({
    mutationFn: async (contact: ContactRequest) => postContact(contact),
    onSuccess(_data, _variables, _context) {
      toastMessage("success", "Successful sent!");
    },
  });

  return (
    <section className="w-full flex flex-col items-center gap-8">
      <h1 className="w-full text-4xl text-center font-semibold">Contact us</h1>
      <div
        style={{
          backgroundColor: theme.colorBgContainer,
          borderRadius: theme.borderRadius,
          boxShadow: "rgba(0, 0, 0, 0.05) 0px 10px 50px",
        }}
        className="w-full max-w-screen-lg border grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-12 p-6"
      >
        <div
          style={{
            backgroundColor: theme.colorPrimaryHover,
            borderRadius: theme.borderRadius,
            color: theme.colorTextLightSolid,
          }}
          className="w-full h-[400px] flex items-center justify-center background-pattern-white"
        >
          <HelpIcon width={200} height={200} opacity={0.75} />
        </div>

        <div className="w-full flex items-center justify-center">
          <div className="w-full">
            <Form<ContactRequest>
              name="form-add-contact"
              layout={"vertical"}
              style={{ maxWidth: 600 }}
              onFinish={(item: ContactRequest) => {
                mutationAdd.mutate(item);
              }}
              autoComplete="on"
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
                name="subject"
                label="Subject"
                rules={[
                  { required: true, message: `Please enter the subject.` },
                ]}
              >
                <Input
                  disabled={mutationAdd.isPending}
                  size="large"
                  placeholder="Subject"
                />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    type: `email`,
                    message: `Please enter your email.`,
                  },
                ]}
              >
                <Input
                  disabled={mutationAdd.isPending}
                  size="large"
                  placeholder="Your Email"
                />
              </Form.Item>

              <Form.Item
                name="message"
                label="Message"
                rules={[
                  { required: true, message: `Please enter your message.` },
                ]}
              >
                <TextArea
                  disabled={mutationAdd.isPending}
                  placeholder="Your Message"
                  rows={5}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  loading={mutationAdd.isPending}
                  type="primary"
                  size="large"
                  htmlType="submit"
                >
                  Send
                </Button>
              </Form.Item>

              <br />
              <Alert
                showIcon={false}
                style={{
                  height:
                    mutationAdd.isError &&
                    (mutationAdd.error?.message?.length ?? 0) > 0
                      ? "auto"
                      : "0px",
                  padding:
                    mutationAdd.isError &&
                    (mutationAdd.error?.message?.length ?? 0) > 0
                      ? "8px 12px"
                      : "0px",
                  borderWidth:
                    mutationAdd.isError &&
                    (mutationAdd.error?.message?.length ?? 0) > 0
                      ? "1px"
                      : "0px",
                  marginBottom:
                    mutationAdd.isError &&
                    (mutationAdd.error?.message?.length ?? 0) > 0
                      ? "10px"
                      : "0px",
                }}
                message={
                  mutationAdd.isError &&
                  (mutationAdd.error?.message?.length ?? 0) > 0
                    ? mutationAdd.error?.message
                    : undefined
                }
                type="error"
                className="transition-all duration-150 ease-in-out"
              />
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
