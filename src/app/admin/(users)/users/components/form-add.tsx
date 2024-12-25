"use client";

import FormAlertDefaultError from "@/components/form/alert/default-error";
import FormItemCheckbox from "@/components/form/checkbox/checkbox";
import FormModalFooter from "@/components/form/form-modal-footer";
import FormItemInputEmail from "@/components/form/input/input-email";
import FormItemInputPhone from "@/components/form/input/input-phone";
import FormItemSelectRole from "@/components/form/select/select-role";
import { UserRequest } from "@/lib/api/user/user/request";
import { MailFilled, PhoneFilled } from "@ant-design/icons";
import { Form, Segmented } from "antd";
import { useState } from "react";

export default function FormAddUser(props: {
  isLoading?: boolean;
  canSubmit?: boolean;
  errorMessage?: string;
  onValuesChange?: (values: UserRequest) => void;
  onSubmit: (data: UserRequest) => void;
  onCancel: () => void;
}) {
  const [addMethod, setAddMethod] = useState("email");

  return (
    <Form
      name="add-user-form"
      layout={"vertical"}
      onFinish={props.onSubmit}
      onValuesChange={(_changed, values) => {
        if (props.onValuesChange) {
          props.onValuesChange(values);
        }
        const newMethod = values?.addMethod ?? null;
        if (newMethod != null && newMethod != addMethod) {
          setAddMethod(newMethod);
        }
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
        <FormItemInputEmail
          label="Email"
          name={"email"}
          isLoading={props.isLoading}
          required={true}
          size="middle"
        />
      ) : (
        <FormItemInputPhone
          label="Phone number"
          name={"phoneNumber"}
          isLoading={props.isLoading}
          required={true}
          size="middle"
        />
      )}

      <FormItemSelectRole isLoading={props.isLoading} size="middle" />

      <FormItemCheckbox
        required={true}
        isLoading={props.isLoading}
        label="Is activated"
        name="isActivated"
      />

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
