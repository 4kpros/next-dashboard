import { Tooltip } from "antd";
import { SectionResponse } from "@/lib/api/school/highschool/section/response";

export default function TableColumnSection({
  record,
}: {
  record?: SectionResponse;
}) {
  const description = `${
    (record?.name?.length ?? 0) < 1
      ? "Undefined"
      : record?.name
      ? record?.name
      : "Undefined"
  }${
    record?.description && record?.description.length > 0
      ? `(${record.description})`
      : ""
  }`;

  return (
    <div className="w-auto flex items-center gap-2">
      <Tooltip placement="topLeft" title={description}>
        {description}
      </Tooltip>
    </div>
  );
}
