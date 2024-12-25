import { SchoolResponse } from "@/lib/api/school/school/response";
import { DescriptionsProps } from "antd";

export default function getDescriptionSchool(
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
