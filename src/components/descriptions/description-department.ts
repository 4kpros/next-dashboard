import { DepartmentResponse } from "@/lib/api/school/university/department/response";
import { DescriptionsProps } from "antd";

export default function getDescriptionDepartment(
  item?: DepartmentResponse | null
): DescriptionsProps["items"] {
  return [
    {
      key: "id",
      label: "Department ID",
      children: item?.id,
    },
    {
      key: "name",
      label: "Department name",
      children: item?.name,
    },
    {
      key: "type",
      label: "Department description",
      children: item?.description,
    },
  ];
}
