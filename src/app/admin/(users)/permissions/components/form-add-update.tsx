import FormModalFooter from "@/components/form/form-modal-footer";
import { PermissionRequest } from "@/lib/api/permission/request";
import { PermissionResponse } from "@/lib/api/permission/response";
import { Form } from "antd";
import FormItemSelectRole from "@/components/form/select/select-role";
import FormItemSelectPermissionTable from "@/components/form/select/select-permission-table";
import FormAlertDefaultError from "@/components/form/alert/default-error";
import FormAlertDefaultDescription from "@/components/form/alert/default-description";
import FormItemCheckbox from "@/components/form/checkbox/checkbox";

export default function FormAddUpdatePermission(props: {
  isLoading?: boolean;
  permission?: PermissionResponse | null;
  canSubmit?: boolean;
  canSubmitMessage?: string;
  errorMessage?: string;
  onValuesChange?: (values: PermissionRequest) => void;
  onSubmit: (permission: PermissionRequest) => void;
  onCancel: () => void;
}) {
  return (
    <Form<PermissionRequest>
      name="form-add-update-permission"
      layout={"vertical"}
      onFinish={props.onSubmit}
      onValuesChange={(_changed, values) => {
        props.onValuesChange!(values);
      }}
      autoComplete="on"
    >
      <br />
      <FormItemSelectRole
        isLoading={props.isLoading}
        defaultValue={props.permission?.role?.id?.toString()}
        size="middle"
      />
      <FormItemSelectPermissionTable
        isLoading={props.isLoading}
        defaultValue={props.permission?.tableName}
        size="middle"
      />
      <FormItemCheckbox
        isLoading={props.isLoading}
        defaultValue={props.permission?.create}
        label="Create"
        name="create"
      />
      <FormItemCheckbox
        isLoading={props.isLoading}
        defaultValue={props.permission?.create}
        label="Read"
        name="read"
      />
      <FormItemCheckbox
        isLoading={props.isLoading}
        defaultValue={props.permission?.create}
        label="Update"
        name="update"
      />
      <FormItemCheckbox
        isLoading={props.isLoading}
        defaultValue={props.permission?.create}
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
