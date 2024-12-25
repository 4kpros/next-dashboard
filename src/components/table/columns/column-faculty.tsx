import { Tooltip } from "antd";
import { FacultyResponse } from "@/lib/api/school/university/faculty/response";

export default function TableColumnFaculty({
  record,
}: {
  record?: FacultyResponse;
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
