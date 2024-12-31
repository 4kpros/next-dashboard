import ModalInfoFooter from "@/components/form/modal-info-footer";
import { formatDateTime } from "@/helpers/date/format";
import { CommunicationResponse } from "@/lib/api/communication/response";
import { Descriptions, DescriptionsProps } from "antd";

export default function CommunicationDetails(props: {
  communication?: CommunicationResponse | null;
  onClose: () => void;
}) {
  return (
    <div className="mt-4">
      <Descriptions
        items={getDescription(props.communication)}
        size={"small"}
        layout={"horizontal"}
        bordered={true}
        column={1}
      />
      <ModalInfoFooter onClose={props.onClose} />
    </div>
  );
}

function getDescription(
  item?: CommunicationResponse | null
): DescriptionsProps["items"] {
  const createdAt = formatDateTime(item?.createdAt?.toString());
  const updatedAt = formatDateTime(item?.updatedAt?.toString());
  return [
    {
      key: "1",
      label: "ID",
      children: item?.id,
    },
    {
      key: "2",
      label: "Title",
      children: item?.title,
    },
    {
      key: "3",
      label: "Message",
      children: item?.message,
    },
    {
      key: "4",
      label: "Audience type",
      children: item?.audienceType,
    },
    {
      key: "5",
      label: "Audience value",
      children: item?.audienceValue,
    },
    {
      key: "5",
      label: "Updated at",
      children: updatedAt,
    },
  ];
}
