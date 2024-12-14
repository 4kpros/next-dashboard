import { InboxOutlined } from "@ant-design/icons";
import Upload, { UploadChangeParam, UploadFile } from "antd/es/upload";
import FormModalFooter from "../form/form-modal-footer";
import { UploadRequest } from "@/lib/api/upload-download/request";
import { Alert, Form, Radio, Space } from "antd";

export default function UploadModal(props: {
  isLoading?: boolean;
  canSubmit?: boolean;
  canSubmitMessage?: string;
  errorMessage?: string;
  onFileChange?: (info: UploadChangeParam<UploadFile<any>>) => void;
  onFileDrop?: (event: React.DragEvent<HTMLDivElement>) => void;
  onSubmit: (role: UploadRequest) => void;
  onValuesChange?: (values: UploadRequest) => void;
  onCancel?: () => void;
}) {
  return (
    <Form<UploadRequest>
      name="form-add-upload-data"
      layout={"vertical"}
      onFinish={props.onSubmit}
      onValuesChange={(_changed, values) => {
        props.onValuesChange!(values);
      }}
      autoComplete="on"
    >
      <br />
      <Form.Item label="File">
        <Form.Item
          name="file"
          rules={[
            {
              required: true,
              message: "Please select the file!",
            },
          ]}
          noStyle
        >
          <Upload.Dragger
            name={"file"}
            multiple={false}
            maxCount={1}
            //   action={"https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"}
            showUploadList={{
              extra: ({ size = 0 }) => (
                <span style={{ color: "#cccccc" }}>
                  ({(size / 1024 / 1024).toFixed(2)}MB)
                </span>
              ),
              showDownloadIcon: true,
              downloadIcon: "Download",
              showRemoveIcon: true,
            }}
            onChange={props.onFileChange}
            onDrop={props.onFileDrop}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from
              uploading company data or other banned files.
            </p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>

      <Form.Item
        label="Strategy"
        name="strategy"
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
            <Radio value="default">Do not update existing data</Radio>
            <Radio value="update">Update existing data</Radio>
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
