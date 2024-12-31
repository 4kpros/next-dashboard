import { SpecialtyResponse } from "@/lib/api/school/highschool/specialty/response";
import { DescriptionsProps } from "antd";

export default function getDescriptionSpecialty(
  item?: SpecialtyResponse | null
): DescriptionsProps["items"] {
  return [
    {
      key: "id",
      label: "Specialty ID",
      children: item?.id,
    },
    {
      key: "name",
      label: "Specialty name",
      children: item?.name,
    },
    {
      key: "type",
      label: "Specialty description",
      children: item?.description,
    },
  ];
}
