"use client";

import FormAlertDefaultDescription from "@/components/form/alert/default-description";
import FormAlertDefaultError from "@/components/form/alert/default-error";
import FormModalFooter from "@/components/form/form-modal-footer";
import FormItemInputEmail from "@/components/form/input/input-email";
import FormItemInputPhone from "@/components/form/input/input-phone";
import FormItemSelectRole from "@/components/form/select/select-role";
import { UserRequest } from "@/lib/api/user/request";
import { UserResponse } from "@/lib/api/user/response";
import { Form } from "antd";

export default function FormUpdateUser(props: {
  isLoading?: boolean;
  user?: UserResponse | null;
  canSubmit?: boolean;
  canSubmitMessage?: string;
  errorMessage?: string;
  onValuesChange?: (values: UserRequest) => void;
  onSubmit: (values: UserRequest) => void;
  onCancel: () => void;
}) {
  return (
    <Form<UserRequest>
      name="update-user-form"
      layout={"vertical"}
      onFinish={props.onSubmit}
      onValuesChange={(_changed, values) => {
        props.onValuesChange!(values);
      }}
      autoComplete="on"
    >
      <br />
      <FormItemInputEmail
        isLoading={props.isLoading}
        defaultValue={`${props.user?.email}`}
        size="large"
      />
      <FormItemInputPhone
        isLoading={props.isLoading}
        defaultValue={`${props.user?.phoneNumber}`}
        size="large"
      />

      <FormItemSelectRole
        isLoading={props.isLoading}
        defaultValue={props.user?.role?.id?.toString()}
        size="large"
      />

      <br />

      <FormAlertDefaultError errorMessage={props.errorMessage} />
      <FormAlertDefaultDescription canSubmitMessage={props.canSubmitMessage} />
      <FormModalFooter
        isLoading={props.isLoading}
        canSubmit={props.canSubmit}
        onCancel={props.onCancel}
      />
    </Form>
  );
}
