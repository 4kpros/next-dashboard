import { Button, Form } from "antd";

export default function FormModalFooter(props: { onCancel?: () => void }) {
  return (
    <div className="w-full flex flex-wrap items-center justify-end gap-1 mt-4">
      <Button onClick={props.onCancel}>Cancel</Button>
      <Form.Item noStyle>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </div>
  );
}
