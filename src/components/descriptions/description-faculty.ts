import { FacultyResponse } from "@/lib/api/school/university/faculty/response";
import { DescriptionsProps } from "antd";

export default function getDescriptionFaculty(
  item?: FacultyResponse | null
): DescriptionsProps["items"] {
  return [
    {
      key: "id",
      label: "Faculty ID",
      children: item?.id,
    },
    {
      key: "name",
      label: "Faculty name",
      children: item?.name,
    },
    {
      key: "type",
      label: "Faculty description",
      children: item?.description,
    },
  ];
}
