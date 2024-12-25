"use client";

import { theme as antdTheme, Avatar } from "antd";
import ImageWithFallback from "@/components/image/image-fallback";
import { Tooltip } from "antd";
import { UserResponse } from "@/lib/api/user/user/response";
import GoogleIcon from "@/components/icons/iconfinder/google";
import FacebookIcon from "@/components/icons/iconfinder/facebook";

export default function TableColumnUser({
  record,
  showEmailOrPhone,
}: {
  record?: UserResponse;
  showEmailOrPhone?: boolean;
}) {
  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  const fullNameTrunc =
    (record?.info?.firstName?.substring(0, 1) ?? "") +
    (record?.info?.lastName?.substring(0, 1) ?? "");

    const description =
    fullNameTrunc.length < 1
      ? showEmailOrPhone === true
        ? record?.email ?? `${record?.phoneNumber}`
        : "Undefined"
      : `${record?.info?.firstName} ${record?.info?.lastName}`;

  return (
    <div className="w-auto flex items-center gap-2">
      <Avatar
        style={{
          backgroundColor: theme.colorTextPlaceholder,
        }}
        size="default"
        src={
          <ImageWithFallback
            alt=""
            src={record?.info?.image ?? undefined}
            fallback={
              <span
                style={{ color: theme.colorTextLightSolid }}
                className="w-auto text-xs"
              >
                {fullNameTrunc.length > 1 ? fullNameTrunc.toUpperCase() : "NA"}
              </span>
            }
          />
        }
      />
      <Tooltip
        placement="topLeft"
        title={description}
        className="flex items-center gap-1"
      >
        {description}
        {record?.provider === "google" ? (
          <GoogleIcon width={16} height={16} />
        ) : record?.provider === "facebook" ? (
          <FacebookIcon width={16} height={16} />
        ) : null}
      </Tooltip>
    </div>
  );
}
