import ModalInfoFooter from "@/components/form/modal-info-footer";
import { formatDateTime } from "@/helpers/date/format";
import { PermissionListResponse, PermissionResponse } from "@/lib/api/user/permission/response";
import { Descriptions, DescriptionsProps } from "antd";

export default function PermissionDetails(props: {
  permission?: PermissionResponse;
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
  item?: PermissionResponse
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
      label: "Role",
      children: item?.role?.name,
    },
    {
      key: "tableName",
      label: "Table name",
      children: item?.tableName,
    },
    {
      key: "create",
      label: "Create",
      children: item?.create === true ? "True" : "False",
    },
    {
      key: "read",
      label: "Read",
      children: item?.read === true ? "True" : "False",
    },
    {
      key: "update",
      label: "Update",
      children: item?.update === true ? "True" : "False",
    },
    {
      key: "delete",
      label: "Delete",
      children: item?.delete === true ? "True" : "False",
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
