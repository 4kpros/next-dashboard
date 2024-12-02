"use client";

import { ArrowRightOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { theme } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";

interface Hero2CardType {
  icon: ReactNode | null;
  title: string | null;
  subtitle: string | null;
  actionText: string | null;
  actionHref: string | null;
}
export { type Hero2CardType };
export default function Hero2Card(props: { item: Hero2CardType }) {
  const router = useRouter();
  const {
    token: { colorPrimary, colorFillContent, borderRadius },
  } = theme.useToken();

  return (
    <div className="p-4 md:w-1/3">
      <div
        style={{
          background: colorFillContent,
          borderRadius: borderRadius,
        }}
        className="flex h-full p-8 flex-col"
      >
        <div className="flex items-center mb-3">
          <div
            style={{
              backgroundColor: colorPrimary,
            }}
            className="w-8 h-8 p-[6px] mr-3 inline-flex items-center justify-center rounded-full flex-shrink-0"
          >
            {props.item.icon ?? <InfoCircleOutlined />}
          </div>
          <h2 className="text-lg font-medium">
            {props.item.title ?? "Title"}
          </h2>
        </div>
        <div className="flex-grow">
          <p className="leading-relaxed text-base">
            {props.item.subtitle ?? "Subtitle"}
          </p>
          <Link
            style={{
              color: colorPrimary,
            }}
            href={props.item.actionHref ?? ""}
            className="mt-3 inline-flex items-center"
          >
            {props.item.actionText ?? "Action text"} {" "} <ArrowRightOutlined />
          </Link>
        </div>
      </div>
    </div>
  );
}
