import { SectionResponse } from "@/lib/api/school/highschool/section/response";
import { DescriptionsProps } from "antd";

export default function getDescriptionSection(
  item?: SectionResponse | null
): DescriptionsProps["items"] {
  return [
    {
      key: "id",
      label: "Section ID",
      children: item?.id,
    },
    {
      key: "name",
      label: "Section name",
      children: item?.name,
    },
    {
      key: "type",
      label: "Section description",
      children: item?.description,
    },
  ];
}
