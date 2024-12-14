import { DownloadRequest } from "@/lib/api/upload-download/request";
import { Alert, Form, Radio, Space } from "antd";
import FormModalFooter from "../form/form-modal-footer";

export default function DownloadModal(props: {
  isLoading?: boolean;
  canSubmit?: boolean;
  canSubmitMessage?: string;
  errorMessage?: string;
  onSubmit: (role: DownloadRequest) => void;
  onValuesChange?: (values: DownloadRequest) => void;
  onCancel?: () => void;
}) {
  return (
    <Form<DownloadRequest>
      name="form-add-download-data"
      layout={"vertical"}
      onFinish={props.onSubmit}
      onValuesChange={(_changed, values) => {
        props.onValuesChange!(values);
      }}
      autoComplete="on"
    >
      <br />
      <Form.Item
        label="Selection"
        name="selection"
        initialValue={"default"}
        rules={[
          {
            required: true,
            message: "Please select the strategy!",
          },
        ]}
      >
        <Radio.Group>
          <Space direction="vertical">
            <Radio value="default">Download this page</Radio>
            <Radio value="all">Download all pages</Radio>
          </Space>
        </Radio.Group>
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
