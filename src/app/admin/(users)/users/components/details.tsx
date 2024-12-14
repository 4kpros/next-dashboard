import ModalInfoFooter from "@/components/form/modal-info-footer";
import { formatDateTime } from "@/helpers/date/format";
import { UserResponse } from "@/lib/api/user/response";
import { Descriptions, DescriptionsProps } from "antd";

export default function UserDetails(props: {
  user?: UserResponse | null;
  onClose: () => void;
}) {
  return (
    <div className="mt-4">
      <Descriptions
        items={getDescription(props.user)}
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
  item?: UserResponse | null
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
      label: "Email",
      children: item?.email,
    },
    {
      key: "3",
      label: "Phone number",
      children: item?.phoneNumber,
    },
    {
      key: "4",
      label: "Role",
      children: item?.role?.name,
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
