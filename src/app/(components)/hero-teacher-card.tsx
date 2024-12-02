"use client";

import { ArrowRightOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { theme } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";

interface HeroTeacherCardType {
  image: string | null;
  title: string | null;
  subtitle: string | null;
}
export { type HeroTeacherCardType };
export default function HeroTeacherCard(props: { item: HeroTeacherCardType }) {
  const router = useRouter();
  const {
    token: { colorPrimary, colorFillContent, borderRadius },
  } = theme.useToken();

  return (
    <div
      style={{
        background: colorFillContent,
        borderRadius: borderRadius,
      }}
      className="w-full p-4"
    >
      <Image
        style={{
          borderRadius: borderRadius,
        }}
        src={props.item.image ?? ""}
        alt=""
        width={1500}
        height={1500}
        className="w-full h-48 object-cover object-center mb-6"
      />
      <h3
        style={{
          color: colorPrimary,
        }}
        className="tracking-widest text-xs font-medium"
      >
        {props.item.title}
      </h3>
      <p className="leading-relaxed text-base">{props.item.subtitle}</p>
    </div>
  );
}
