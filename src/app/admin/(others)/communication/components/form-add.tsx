import FormModalFooter from "@/components/form/form-modal-footer";
import { FEATURES } from "@/lib/features";
import { CommunicationRequest } from "@/lib/api/communication/request";
import { CommunicationResponse } from "@/lib/api/communication/response";
import { Alert, Form, Input, Select } from "antd";

export default function FormAddCommunication(props: {
  isLoading?: boolean;
  communication?: CommunicationResponse | null;
  canSubmit?: boolean;
  canSubmitMessage?: string;
  errorMessage?: string;
  onValuesChange?: (values: CommunicationRequest) => void;
  onSubmit: (communication: CommunicationRequest) => void;
  onCancel: () => void;
}) {
  return (
    <Form<CommunicationRequest>
      name="form-add-communication"
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
        label="Title"
        name="title"
        initialValue={props.communication?.title}
        rules={[
          {
            required: true,
            message: "Please enter the title!",
          },
        ]}
      >
        <Input
          disabled={props.isLoading}
          size="middle"
          placeholder="Enter the title"
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
