import ModalInfoFooter from "@/components/form/modal-info-footer";
import FacebookIcon from "@/components/icons/iconfinder/facebook";
import GoogleIcon from "@/components/icons/iconfinder/google";
import { formatDateTime } from "@/helpers/date/format";
import { DirectorResponse } from "@/lib/api/school/director/response";
import { SchoolResponse } from "@/lib/api/school/school/response";
import { UserResponse } from "@/lib/api/user/user/response";
import { Descriptions, DescriptionsProps, Divider } from "antd";

export default function DirectorDetails(props: {
  director?: DirectorResponse | null;
  onClose: () => void;
}) {
  return (
    <div className="mt-4">
      <Descriptions
        items={getDescription(props.director)}
        size={"small"}
        layout={"horizontal"}
        bordered={true}
        column={1}
      />
      <br />
      <Divider plain>User</Divider>
      <Descriptions
        items={getUserDescription(props.director?.user)}
        size={"small"}
        layout={"horizontal"}
        bordered={true}
        column={1}
      />
      <br />
      <Divider plain>School</Divider>
      <Descriptions
        items={getSchoolDescription(props.director?.school)}
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
  item?: DirectorResponse | null
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

function getUserDescription(
  item?: UserResponse | null
): DescriptionsProps["items"] {
  return [
    {
      key: "id",
      label: "User ID",
      children: item?.id,
    },
    {
      key: "email",
      label: "User Email",
      children: (
        <div className="flex items-center gap-1">
          {item?.email}
          {item?.provider === "google" ? (
            <GoogleIcon width={20} height={20} />
          ) : item?.provider === "facebook" ? (
            <FacebookIcon width={20} height={20} />
          ) : null}
        </div>
      ),
    },
    {
      key: "phoneNumber",
      label: "User Phone number",
      children: item?.phoneNumber,
    },
  ];
}

function getSchoolDescription(
  item?: SchoolResponse | null
): DescriptionsProps["items"] {
  return [
    {
      key: "id",
      label: "School ID",
      children: item?.id,
    },
    {
      key: "name",
      label: "School Name",
      children: item?.name,
    },
    {
      key: "type",
      label: "School Type",
      children: item?.type,
    },
  ];
}
