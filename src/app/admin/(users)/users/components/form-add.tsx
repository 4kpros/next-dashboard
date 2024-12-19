"use client";

import FormAlertDefaultError from "@/components/form/alert/default-error";
import FormModalFooter from "@/components/form/form-modal-footer";
import FormItemInputEmail from "@/components/form/input/input-email";
import FormItemInputPhone from "@/components/form/input/input-phone";
import FormItemSelectRole from "@/components/form/select/select-role";
import { UserRequest } from "@/lib/api/user/request";
import { UserResponse } from "@/lib/api/user/response";
import { MailFilled, PhoneFilled } from "@ant-design/icons";
import { Form, Segmented } from "antd";
import { useState } from "react";

export default function FormAddUser(props: {
  isLoading?: boolean;
  user?: UserResponse | null;
  canSubmit?: boolean;
  errorMessage?: string;
  onValuesChange?: (values: UserRequest) => void;
  onSubmit: (user: UserRequest) => void;
  onCancel: () => void;
}) {
  const [addMethod, setAddMethod] = useState("email");

  const onFormValuesChange = (values: UserRequest) => {
    const newMethod = values?.addMethod ?? null;
    if (newMethod != null && newMethod != addMethod) {
      setAddMethod(newMethod);
      props.onValuesChange!(values);
    }
  };

  return (
    <Form
      name="add-user-form"
      layout={"vertical"}
      onFinish={props.onSubmit}
      onValuesChange={(_changed, values) => {
        onFormValuesChange!(values);
      }}
      autoComplete="on"
    >
      <br />
      <Form.Item
        label="Add user using"
        name="addMethod"
        initialValue={addMethod}
      >
        <Segmented
          size="middle"
          options={[
            { label: "Email", value: "email", icon: <MailFilled /> },
            { label: "Phone number", value: "phone", icon: <PhoneFilled /> },
          ]}
        />
      </Form.Item>
      <br />

      {addMethod == "email" ? (
        <FormItemInputEmail isLoading={props.isLoading} size="middle" />
      ) : (
        <FormItemInputPhone isLoading={props.isLoading} size="middle" />
      )}

      <FormItemSelectRole isLoading={props.isLoading} size="middle" />

      <br />
      <FormAlertDefaultError errorMessage={props.errorMessage} />
      <FormModalFooter
        isLoading={props.isLoading}
        canSubmit={true}
        onCancel={props.onCancel}
      />
    </Form>
  );
}
