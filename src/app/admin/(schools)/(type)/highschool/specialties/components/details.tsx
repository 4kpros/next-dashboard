
import ModalInfoFooter from "@/components/form/modal-info-footer";
import { formatDateTime } from "@/helpers/date/format";
import { Descriptions, DescriptionsProps, Divider } from "antd";
import { SpecialtyResponse } from "@/lib/api/school/highschool/specialty/response";

import getDescriptionSection from "@/components/descriptions/description-section";
import getDescriptionSchool from "@/components/descriptions/description-school";

export default function SpecialtyDetails(props: {
  item?: SpecialtyResponse | null;
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
      <br />
      <Divider plain>Section</Divider>
      <Descriptions
        items={getDescriptionSection(props.item?.section)}
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
  item?: SpecialtyResponse | null
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

