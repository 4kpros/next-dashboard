import FormModalFooter from "@/components/form/form-modal-footer";
import { FEATURES } from "@/lib/features";
import { PermissionRequest } from "@/lib/api/permission/request";
import { PermissionResponse } from "@/lib/api/permission/response";
import { Alert, Form, Input, Select } from "antd";

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
      style={{ maxWidth: 600 }}
      onFinish={props.onSubmit}
      onValuesChange={(_changed, values) => {
        props.onValuesChange!(values);
      }}
      autoComplete="on"
    >
      <br />
      {/* <Form.Item
        label="Name"
        name="name"
        initialValue={props.permission?.name}
        rules={[
          {
            required: true,
            message: "Please enter the permission name!",
          },
        ]}
      >
        <Input
          disabled={props.isLoading}
          size="middle"
          placeholder="Enter the permission name"
        />
      </Form.Item>

      <Form.Item
        label="Feature"
        name="feature"
        initialValue={props.permission?.feature}
        rules={[
          {
            required: true,
            message: "Please select the feature!",
          },
        ]}
      >
        <Select
          disabled={props.isLoading}
          size="middle"
          placeholder="Select the feature"
        >
          {FEATURES.map((item, index) => (
            <Select.Option key={index} value={item}>
              <span className="capitalize">{item.substring(8)}</span>
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        initialValue={props.permission?.description}
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Input
          disabled={props.isLoading}
          size="middle"
          placeholder="Enter the permission description"
        />
      </Form.Item> */}
      <br />
      <Alert
        showIcon={false}
        style={{
          height:
            props.errorMessage && props.errorMessage.length > 0
              ? "auto"
              : "0px",
          padding:
            props.errorMessage && props.errorMessage.length > 0
              ? "8px 12px"
              : "0px",
          borderWidth:
            props.errorMessage && props.errorMessage.length > 0 ? "1px" : "0px",
          marginBottom:
            props.errorMessage && props.errorMessage.length > 0
              ? "10px"
              : "0px",
        }}
        message={
          props.errorMessage && props.errorMessage.length > 0
            ? props.errorMessage
            : undefined
        }
        type="error"
        className="transition-all duration-150 ease-in-out"
      />
      {props.canSubmitMessage && props.canSubmitMessage.length > 0 ? (
        <div className="w-full flex items-center justify-end">
          <p className="w-auto text-end opacity-75">{props.canSubmitMessage}</p>
        </div>
      ) : null}
      <FormModalFooter
        isLoading={props.isLoading}
        canSubmit={props.canSubmit}
        onCancel={props.onCancel}
      />
    </Form>
  );
}
