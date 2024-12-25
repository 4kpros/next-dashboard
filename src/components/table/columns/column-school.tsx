"use client";

import { theme as antdTheme } from "antd";
import SchoolIcon from "@/components/icons/hugeicons/school";
import UniversityIcon from "@/components/icons/hugeicons/university";
import ImageWithFallback from "@/components/image/image-fallback";
import { SchoolResponse } from "@/lib/api/school/school/response";
import { Tooltip } from "antd";
import { SCHOOL_TYPE_HIGHSCHOOL } from "@/lib/constants/school";

export default function TableColumnSchool({
  record,
  showType,
}: {
  record?: SchoolResponse;
  showType?: boolean;
}) {
  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  const description = `${
    (record?.name?.length ?? 0) < 1
      ? "Undefined"
      : record?.name
      ? record?.name
      : "Undefined"
  }${
    showType === true ? `(${record?.type ? record?.type : "Undefined"})` : ""
  }`;

  return (
    <div className="w-auto flex items-center gap-2">
      <div
        style={{
          backgroundColor: theme.colorTextPlaceholder,
          borderRadius: theme.borderRadius,
        }}
        className="w-8 h-8 flex items-center justify-center"
      >
        <ImageWithFallback
          alt=""
          src={record?.info?.logo ?? undefined}
          style={{
            borderRadius: theme.borderRadius,
          }}
          fallback={
            record?.type === SCHOOL_TYPE_HIGHSCHOOL ? (
              <SchoolIcon
                width={20}
                height={20}
                color={theme.colorTextLightSolid}
              />
            ) : (
              <UniversityIcon
                width={20}
                height={20}
                color={theme.colorTextLightSolid}
              />
            )
          }
        />
      </div>
      <Tooltip placement="topLeft" title={description}>
        {description}
      </Tooltip>
    </div>
  );
}
