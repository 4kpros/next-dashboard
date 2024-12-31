import { LevelResponse } from "@/lib/api/school/university/level/response";
import { DescriptionsProps } from "antd";

export default function getDescriptionLevel(
  item?: LevelResponse | null
): DescriptionsProps["items"] {
  return [
    {
      key: "id",
      label: "Level ID",
      children: item?.id,
    },
    {
      key: "name",
      label: "Level name",
      children: item?.name,
    },
    {
      key: "type",
      label: "Level description",
      children: item?.description,
    },
  ];
}
