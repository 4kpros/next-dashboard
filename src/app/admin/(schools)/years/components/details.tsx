import ModalInfoFooter from "@/components/form/modal-info-footer";
import { formatDateTime } from "@/helpers/date/format";
import { YearResponse } from "@/lib/api/year/response";
import { Descriptions, DescriptionsProps } from "antd";

export default function YearDetails(props: {
  year?: YearResponse | null;
  onClose: () => void;
}) {
  return (
    <div className="mt-4">
      <Descriptions
        items={getDescription(props.year)}
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
  item?: YearResponse | null
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
      label: "Name",
      children: item?.name,
    },
    {
      key: "3",
      label: "Feature",
      children: item?.feature,
    },
    {
      key: "4",
      label: "Description",
      children: item?.description,
    },
    {
      key: "5",
      label: "Created at",
      children: createdAt,
    },
    {
      key: "5",
      label: "Updated at",
      children: updatedAt,
    },
  ];
}
