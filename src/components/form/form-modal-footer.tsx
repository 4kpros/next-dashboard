import { Button, Form } from "antd";
import React from "react";

export default function FormModalFooter(props: {
  onCancel: () => void;
  onSubmit: () => void;
}) {
  return (
    <div className="w-full flex flex-wrap items-center justify-end gap-1">
      <Button onClick={props.onCancel}>Cancel</Button>
      <Form.Item key={"user-add-submit"} noStyle>
        <Button type="primary" htmlType="submit" onSubmit={props.onSubmit}>
          Submit
        </Button>
      </Form.Item>
    </div>
  );
}
