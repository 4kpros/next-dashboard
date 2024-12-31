import FormModalFooter from "@/components/form/form-modal-footer";
import { RoleRequest } from "@/lib/api/user/role/request";
import { RoleResponse } from "@/lib/api/user/role/response";
import { Form } from "antd";
import FormItemSelectFeature from "@/components/form/select/select-feature";
import FormAlertDefaultError from "@/components/form/alert/default-error";
import FormAlertDefaultDescription from "@/components/form/alert/default-description";
import FormItemInputText from "@/components/form/input/input-text";

export default function FormAddUpdateRole(props: {
  isLoading?: boolean;
  item?: RoleResponse | null;
  canSubmit?: boolean;
  canSubmitMessage?: string;
  errorMessage?: string;
  onValuesChange?: (values: RoleRequest) => void;
  onSubmit: (data: RoleRequest) => void;
  onCancel: () => void;
}) {
  return (
    <Form<RoleRequest>
      name="form-add-update-role"
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
      <FormItemInputText
        label="Name"
        name="name"
        placeholder="Enter the role name"
        size="middle"
        isLoading={props.isLoading}
        defaultValue={props.item?.name}
        rules={[
          {
            required: true,
            message: "Please enter the role name!",
          },
        ]}
      />

      <FormItemSelectFeature
        isLoading={props.isLoading}
        defaultValue={props.item?.feature}
        size="middle"
      />
      <FormItemInputText
        label="Description"
        name="description"
        placeholder="Enter the role description"
        size="middle"
        isLoading={props.isLoading}
        defaultValue={props.item?.description}
        rules={[
          {
            required: false,
          },
        ]}
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
