import ModalInfoFooter from "@/components/form/modal-info-footer";
import { formatDateTime } from "@/helpers/date/format";
import { SchoolResponse } from "@/lib/api/school/school/response";
import { Descriptions, DescriptionsProps, Divider } from "antd";
import Link from "next/link";

export default function SchoolDetails(props: {
  item?: SchoolResponse | null;
  onClose: () => void;
}) {
  return (
    <div className="mt-4">
      <Descriptions
        items={getDescription(props.item)}
        size={"small"}
        layout={"horizontal"}
        bordered={true}
        column={1}
      />
      <br />
      <Divider plain>Config</Divider>
      <Descriptions
        items={getConfigDescription(props.item)}
        size={"small"}
        layout={"horizontal"}
        bordered={true}
        column={1}
      />
      <br />
      <Divider plain>Info</Divider>
      <Descriptions
        items={getInfoDescription(props.item)}
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
  item?: SchoolResponse | null
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
      label: "Type",
      children: item?.type,
    },
    {
      key: "5",
      label: "Created at",
      children: createdAt,
    },
    {
      key: "6",
      label: "Updated at",
      children: updatedAt,
    },
  ];
}

function getConfigDescription(
  item?: SchoolResponse | null
): DescriptionsProps["items"] {
  return [
    {
      key: "1",
      label: "Email domain",
      children: item?.config?.emailDomain,
    },
  ];
}

function getInfoDescription(
  item?: SchoolResponse | null
): DescriptionsProps["items"] {
  const foundedAt = formatDateTime(item?.info?.foundedAt?.toString());
  return [
    {
      key: "fullName",
      label: "Full name",
      children: item?.info?.fullName,
    },
    {
      key: "slogan",
      label: "Slogan",
      children: item?.info?.slogan,
    },
    {
      key: "phoneNumber1",
      label: "Phone Number 1",
      children: item?.info?.phoneNumber1,
    },
    {
      key: "phoneNumber2",
      label: "Phone Number 2",
      children: item?.info?.phoneNumber2,
    },
    {
      key: "phoneNumber3",
      label: "Phone Number 3",
      children: item?.info?.phoneNumber3,
    },
    {
      key: "email1",
      label: "email 1",
      children: item?.info?.email1,
    },
    {
      key: "email2",
      label: "email 2",
      children: item?.info?.email2,
    },
    {
      key: "email3",
      label: "email 3",
      children: item?.info?.email3,
    },
    {
      key: "founder",
      label: "Founder",
      children: item?.info?.founder,
    },
    {
      key: "foundedAt",
      label: "Founded at",
      children: foundedAt,
    },
    {
      key: "address",
      label: "Address",
      children: item?.info?.address,
    },
    {
      key: "locationLongitude",
      label: "Location longitude",
      children: item?.info?.locationLongitude,
    },
    {
      key: "locationLatitude",
      label: "Location latitude",
      children: item?.info?.locationLatitude,
    },
    {
      key: "logo",
      label: "Logo",
      children: (
        <Link href={item?.info?.logo ?? ""} target="_blank">
          {item?.info?.logo ? item?.info?.logo : ""}
        </Link>
      ),
    },
    {
      key: "image1",
      label: "Image 1",
      children: (
        <Link href={item?.info?.image1 ?? ""} target="_blank">
          {item?.info?.image1 ? item?.info?.image1 : ""}
        </Link>
      ),
    },
    {
      key: "image2",
      label: "Image 2",
      children: (
        <Link href={item?.info?.image2 ?? ""} target="_blank">
          {item?.info?.image2 ? item?.info?.image2 : ""}
        </Link>
      ),
    },
    {
      key: "image3",
      label: "Image 4",
      children: (
        <Link href={item?.info?.image3 ?? ""} target="_blank">
          {item?.info?.image3 ? item?.info?.image3 : ""}
        </Link>
      ),
    },
    {
      key: "image4",
      label: "Image 4",
      children: (
        <Link href={item?.info?.image4 ?? ""} target="_blank">
          {item?.info?.image4 ? item?.info?.image4 : ""}
        </Link>
      ),
    },
  ];
}
