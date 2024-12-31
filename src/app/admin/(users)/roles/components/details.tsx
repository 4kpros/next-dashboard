import ModalInfoFooter from "@/components/form/modal-info-footer";
import { formatDateTime } from "@/helpers/date/format";
import { RoleResponse } from "@/lib/api/user/role/response";
import { Descriptions, DescriptionsProps } from "antd";

export default function RoleDetails(props: {
  role?: RoleResponse | null;
  onClose: () => void;
}) {
  return (
    <div className="mt-4">
      <Descriptions
        items={getDescription(props.role)}
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
  item?: RoleResponse | null
): DescriptionsProps["items"] {
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
      key: "feature",
      label: "Feature",
      children: item?.feature,
    },
    {
      key: "description",
      label: "Description",
      children: item?.description,
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
