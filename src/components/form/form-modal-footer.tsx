import { Button, Form } from "antd";

export default function FormModalFooter(props: {
  isLoading?: boolean;
  canSubmit?: boolean;
  onCancel?: () => void;
}) {
  return (
    <div className="w-full flex flex-wrap items-center justify-end gap-1 mt-4">
      <Button disabled={props.isLoading} onClick={props.onCancel}>
        Cancel
      </Button>
      <Form.Item noStyle>
        <Button
          disabled={props.canSubmit != true}
          loading={props.isLoading}
          type="primary"
          htmlType="submit"
        >
          Submit
        </Button>
      </Form.Item>
    </div>
  );
}
