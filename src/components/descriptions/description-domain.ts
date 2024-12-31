import { DomainResponse } from "@/lib/api/school/university/domain/response";
import { DescriptionsProps } from "antd";

export default function getDescriptionDomain(
  item?: DomainResponse | null
): DescriptionsProps["items"] {
  return [
    {
      key: "id",
      label: "Domain ID",
      children: item?.id,
    },
    {
      key: "name",
      label: "Domain name",
      children: item?.name,
    },
    {
      key: "type",
      label: "Domain description",
      children: item?.description,
    },
  ];
}
