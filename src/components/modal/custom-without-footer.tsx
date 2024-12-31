import { Modal } from "antd";

export default function CustomModalWithoutFooter(props: {
  icon?: React.ReactNode;
  title: string;
  content?: React.ReactNode;
  modalOpen?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  maskClosable?: boolean;
  width?: string | number;
  destroyOnClose?: boolean;
}) {
  return (
    <Modal
      title={
        <div className="w-auto flex items-center gap-2">
          {props.icon}
          <p>{props.title}</p>
        </div>
      }
      onOk={props.onOk}
      onCancel={props.onCancel}
      open={props.modalOpen}
      centered={true}
      maskClosable={props.maskClosable}
      width={props.width}
      footer={[]}
      closeIcon={null}
      destroyOnClose={props.destroyOnClose ?? true}
    >
      {props.content}
    </Modal>
  );
}
