import FormModalFooter from "@/components/form/form-modal-footer";
import { PermissionRequest } from "@/lib/api/user/permission/request";
import { PermissionResponse } from "@/lib/api/user/permission/response";
import { Form } from "antd";
import FormItemSelectRole from "@/components/form/select/select-role";
import FormItemSelectPermissionTable from "@/components/form/select/select-permission-table";
import FormAlertDefaultError from "@/components/form/alert/default-error";
import FormAlertDefaultDescription from "@/components/form/alert/default-description";
import FormItemCheckbox from "@/components/form/checkbox/checkbox";

export default function FormAddUpdatePermission(props: {
  isLoading?: boolean;
  item?: PermissionResponse;
  canSubmit?: boolean;
  canSubmitMessage?: string;
  errorMessage?: string;
  onValuesChange?: (values: PermissionRequest) => void;
  onSubmit: (data: PermissionRequest) => void;
  onCancel: () => void;
}) {
  return (
    <Form<PermissionRequest>
      name="form-add-update-permission"
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
      <FormItemSelectRole
        isLoading={props.isLoading}
        defaultValue={props.item?.role?.id?.toString()}
        size="middle"
      />
      <FormItemSelectPermissionTable
        isLoading={props.isLoading}
        defaultValue={props.item?.tableName}
        size="middle"
      />
      <FormItemCheckbox
        isLoading={props.isLoading}
        required={true}
        defaultValue={props.item?.create}
        label="Create"
        name="create"
      />
      <FormItemCheckbox
        isLoading={props.isLoading}
        required={true}
        defaultValue={props.item?.read}
        label="Read"
        name="read"
      />
      <FormItemCheckbox
        isLoading={props.isLoading}
        required={true}
        defaultValue={props.item?.update}
        label="Update"
        name="update"
      />
      <FormItemCheckbox
        isLoading={props.isLoading}
        required={true}
        defaultValue={props.item?.delete}
        label="Delete"
        name="delete"
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
