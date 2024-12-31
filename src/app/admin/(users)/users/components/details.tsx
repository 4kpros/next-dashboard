import ModalInfoFooter from "@/components/form/modal-info-footer";
import { formatDateTime } from "@/helpers/date/format";
import { UserResponse } from "@/lib/api/user/user/response";
import { Descriptions, DescriptionsProps, Divider } from "antd";
import Link from "next/link";

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
      <br />
      <Divider plain>Info</Divider>
      <Descriptions
        items={getInfoDescription(props.user)}
        size={"small"}
        layout={"horizontal"}
        bordered={true}
        column={1}
      />
      <br />
      <Divider plain>MFA</Divider>
      <Descriptions
        items={getMfaDescription(props.user)}
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
  const activatedAt = formatDateTime(item?.activatedAt?.toString());
  const createdAt = formatDateTime(item?.createdAt?.toString());
  const updatedAt = formatDateTime(item?.updatedAt?.toString());
  return [
    {
      key: "id",
      label: "ID",
      children: item?.id,
    },
    {
      key: "email",
      label: "Email",
      children: item?.email,
    },
    {
      key: "phoneNumber",
      label: "Phone number",
      children: item?.phoneNumber,
    },
    {
      key: "roleName",
      label: "Role",
      children: item?.role?.name,
    },
    {
      key: "loginMethod",
      label: "Login method",
      children: item?.loginMethod,
    },
    {
      key: "provider",
      label: "Provider",
      children: item?.provider,
    },
    {
      key: "providerUserID",
      label: "Provider user ID",
      children: item?.providerUserID,
    },
    {
      key: "isActivated",
      label: "Is activated",
      children: item?.isActivated === true ? "True" : "False",
    },
    {
      key: "activatedAt",
      label: "Activated at",
      children: activatedAt,
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

function getInfoDescription(
  item?: UserResponse | null
): DescriptionsProps["items"] {
  const birthday = formatDateTime(item?.info?.birthday?.toString());
  return [
    {
      key: "username",
      label: "Username",
      children: item?.info?.username,
    },
    {
      key: "firstName",
      label: "First name",
      children: item?.info?.firstName,
    },
    {
      key: "lastName",
      label: "Last name",
      children: item?.info?.lastName,
    },
    {
      key: "gender",
      label: "Gender",
      children: item?.info?.gender,
    },
    {
      key: "birthday",
      label: "Birthday",
      children: birthday,
    },
    {
      key: "birthLocation",
      label: "Birth location",
      children: item?.info?.birthLocation,
    },
    {
      key: "address",
      label: "Address",
      children: item?.info?.address,
    },
    {
      key: "image",
      label: "Image",
      children: (
        <Link href={item?.info?.image ?? ""} target="_blank">
          {item?.info?.image ? item?.info?.image : ""}
        </Link>
      ),
    },
  ];
}

function getMfaDescription(
  item?: UserResponse | null
): DescriptionsProps["items"] {
  return [
    {
      key: "mfaAuthenticator",
      label: "2FA - authenticator app",
      children: item?.mfa?.authenticator === true ? "True" : "False",
    },
    {
      key: "mfaEmail",
      label: "2FA - email",
      children: item?.mfa?.email === true ? "True" : "False",
    },
    {
      key: "mfaPhoneNumber",
      label: "2FA - phone number",
      children: item?.mfa?.phoneNumber === true ? "True" : "False",
    },
  ];
}
