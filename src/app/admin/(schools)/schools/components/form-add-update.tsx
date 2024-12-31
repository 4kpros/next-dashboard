import FormModalFooter from "@/components/form/form-modal-footer";
import { FEATURES } from "@/lib/features";
import { SchoolRequest } from "@/lib/api/school/request";
import { SchoolResponse } from "@/lib/api/school/response";
import { Alert, Form, Input, Select } from "antd";

export default function FormAddUpdateSchool(props: {
  isLoading?: boolean;
  school?: SchoolResponse | null;
  canSubmit?: boolean;
  canSubmitMessage?: string;
  errorMessage?: string;
  onValuesChange?: (values: SchoolRequest) => void;
  onSubmit: (school: SchoolRequest) => void;
  onCancel: () => void;
}) {
  return (
    <Form<SchoolRequest>
      name="form-add-update-school"
      layout={"vertical"}
      style={{ maxWidth: 600 }}
      onFinish={props.onSubmit}
      onValuesChange={(_changed, values) => {
        props.onValuesChange!(values);
      }}
      autoComplete="on"
    >
      <br />
      <Form.Item
        label="Name"
        name="name"
        initialValue={props.school?.name}
        rules={[
          {
            required: true,
            message: "Please enter the school name!",
          },
        ]}
      >
        <Input
          disabled={props.isLoading}
          size="middle"
          placeholder="Enter the school name"
        />
      </Form.Item>

      <Form.Item
        label="Feature"
        name="feature"
        initialValue={props.school?.feature}
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
        initialValue={props.school?.description}
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Input
          disabled={props.isLoading}
          size="middle"
          placeholder="Enter the school description"
        />
      </Form.Item>
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
