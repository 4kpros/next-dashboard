
import getDescriptionFaculty from "@/components/descriptions/description-faculty";
import getDescriptionSchool from "@/components/descriptions/description-school";
import ModalInfoFooter from "@/components/form/modal-info-footer";
import { formatDateTime } from "@/helpers/date/format";
import { DepartmentResponse } from "@/lib/api/school/university/department/response";
import { Descriptions, DescriptionsProps, Divider } from "antd";

export default function DepartmentDetails(props: {
  item?: DepartmentResponse | null;
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
      <Divider plain>Faculty</Divider>
      <Descriptions
        items={getDescriptionFaculty(props.item?.faculty)}
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
  item?: DepartmentResponse | null
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

