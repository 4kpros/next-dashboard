"use client";

import FormAlertDefaultDescription from "@/components/form/alert/default-description";
import FormAlertDefaultError from "@/components/form/alert/default-error";
import FormItemCheckbox from "@/components/form/checkbox/checkbox";
import FormModalFooter from "@/components/form/form-modal-footer";
import FormItemInputEmail from "@/components/form/input/input-email";
import FormItemInputPhone from "@/components/form/input/input-phone";
import FormItemSelectRole from "@/components/form/select/select-role";
import { UserRequest } from "@/lib/api/user/user/request";
import { UserResponse } from "@/lib/api/user/user/response";
import { Form } from "antd";

export default function FormUpdateUser(props: {
  isLoading?: boolean;
  item?: UserResponse | null;
  canSubmit?: boolean;
  canSubmitMessage?: string;
  errorMessage?: string;
  onValuesChange?: (values: UserRequest) => void;
  onSubmit: (data: UserRequest) => void;
  onCancel: () => void;
}) {
  return (
    <Form<UserRequest>
      name="update-user-form"
      layout={"vertical"}
      onFinish={props.onSubmit}
      onValuesChange={(_changed, values) => {
        if (props.onValuesChange) {
          props.onValuesChange(values);
        }
      }}
      autoComplete="on"
    >
      <br />
      <FormItemInputEmail
        label="Email"
        name={"email"}
        isLoading={props.isLoading}
        defaultValue={`${props.item?.email}`}
        required={true}
        size="middle"
      />
      <FormItemInputPhone
        label="Phone number"
        name={"phoneNumber"}
        isLoading={props.isLoading}
        defaultValue={`${props.item?.phoneNumber}`}
        required={false}
        size="middle"
      />

      <FormItemSelectRole
        isLoading={props.isLoading}
        defaultValue={props.item?.role?.id?.toString()}
        size="middle"
      />

      <FormItemCheckbox
        isLoading={props.isLoading}
        required={true}
        defaultValue={props.item?.isActivated ?? undefined}
        label="Is activated"
        name="isActivated"
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
