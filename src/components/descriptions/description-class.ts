import { ClassResponse } from "@/lib/api/school/highschool/class/response";
import { DescriptionsProps } from "antd";

export default function getDescriptionClass(
  item?: ClassResponse | null
): DescriptionsProps["items"] {
  return [
    {
      key: "id",
      label: "Class ID",
      children: item?.id,
    },
    {
      key: "name",
      label: "Class name",
      children: item?.name,
    },
    {
      key: "type",
      label: "Class description",
      children: item?.description,
    },
  ];
}
