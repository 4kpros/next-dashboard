import getDescriptionSchool from "@/components/descriptions/description-school";
import ModalInfoFooter from "@/components/form/modal-info-footer";
import { formatDateTime } from "@/helpers/date/format";
import { SectionResponse } from "@/lib/api/school/highschool/section/response";
import { Descriptions, DescriptionsProps, Divider } from "antd";

export default function SectionDetails(props: {
  item?: SectionResponse | null;
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
      <Divider plain>School</Divider>
      <Descriptions
        items={getDescriptionSchool(props.item?.school)}
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
  item?: SectionResponse | null
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
