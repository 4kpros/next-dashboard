import { Modal } from "antd";

export default function CustomModal(props: {
  icon?: React.ReactNode;
  title: string;
  content?: React.ReactNode;
  okText: string;
  cancelText: string;
  modalOpen: boolean;
  onOk: () => void;
  onCancel: () => void;
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
      okText={props.okText}
      cancelText={props.cancelText}
      onOk={props.onOk}
      onCancel={props.onCancel}
      open={props.modalOpen}
      centered={true}
      maskClosable={props.maskClosable}
      width={props.width}
      closeIcon={null}
      destroyOnClose={props.destroyOnClose ?? true}
    >
      {props.content}
    </Modal>
  );
}
