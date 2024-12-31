import ModalInfoFooter from "@/components/form/modal-info-footer";
import { formatDateTime } from "@/helpers/date/format";
import { YearResponse } from "@/lib/api/school/year/response";
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
  const startDate = formatDateTime(item?.startDate?.toString());
  const endDate = formatDateTime(item?.endDate?.toString());
  const createdAt = formatDateTime(item?.createdAt?.toString());
  const updatedAt = formatDateTime(item?.updatedAt?.toString());
  return [
    {
      key: "id",
      label: "ID",
      children: item?.id,
    },
    {
      key: "name",
      label: "Name",
      children: item?.name,
    },
    {
      key: "startDate",
      label: "Start date",
      children: startDate,
    },
    {
      key: "endDate",
      label: "End date",
      children: endDate,
    },
    {
      key: "createdAt",
      label: "Created at",
      children: createdAt,
    },
    {
      key: "updatedAt",
      label: "Updated at",
      children: updatedAt,
    },
  ];
}
