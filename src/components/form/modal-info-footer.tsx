import { Button } from "antd";
import React from "react";

export default function ModalInfoFooter(props: { onClose?: () => void }) {
  return (
    <div className="w-full flex flex-wrap items-center justify-end gap-1 mt-4">
      <Button onClick={props.onClose} type="primary">
        Close
      </Button>
    </div>
  );
}
