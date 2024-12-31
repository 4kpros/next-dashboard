import ModalInfoFooter from "@/components/form/modal-info-footer";
import { formatDateTime } from "@/helpers/date/format";
import { PermissionResponse } from "@/lib/api/permission/response";
import { Descriptions, DescriptionsProps } from "antd";

export default function PermissionDetails(props: {
  permission?: PermissionResponse | null;
  onClose: () => void;
}) {
  return (
    <div className="mt-4">
      <Descriptions
        items={getDescription(props.permission)}
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
  item?: PermissionResponse | null
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
      label: "Role",
      children: item?.role?.name,
    },
    {
      key: "3",
      label: "Table name",
      children: item?.tableName,
    },
    {
      key: "4",
      label: "Create",
      children: item?.create === true ? "True" : "False",
    },
    {
      key: "5",
      label: "Read",
      children: item?.read === true ? "True" : "False",
    },
    {
      key: "5",
      label: "Update",
      children: item?.update === true ? "True" : "False",
    },
    {
      key: "5",
      label: "Delete",
      children: item?.delete === true ? "True" : "False",
    },
  ];
}
