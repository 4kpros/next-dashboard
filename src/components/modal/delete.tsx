import { ExclamationCircleFilled } from "@ant-design/icons";
import CustomModal from "./custom";

export default function DeleteModal(props: {
  description: string;
  modalOpen: boolean;
  onOk: () => void;
  onCancel: () => void;
}) {
  return (
    <CustomModal
      icon={<ExclamationCircleFilled style={{ color: "orange" }} />}
      title="Delete"
      content={<p>{props.description}</p>}
      okText={"Delete"}
      cancelText={"Cancel"}
      modalOpen={props.modalOpen}
      onOk={props.onOk}
      onCancel={props.onCancel}
      maskClosable={true}
    />
  );
}
