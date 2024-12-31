import { Tooltip } from "antd";
import { DepartmentResponse } from "@/lib/api/school/university/department/response";

export default function TableColumnDepartment({
  record,
}: {
  record?: DepartmentResponse;
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
