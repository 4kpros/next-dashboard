"use client";

import React from "react";
import { theme } from "antd";
import SmallCardsStats from "./components/small-cards-stats";

export default function PageContent() {
  const {
    token: { colorBgContainer, borderRadius },
  } = theme.useToken();

  return (
    <>
      <div className="w-full flex flex-col xl:flex-row items-start justify-between gap-2">
        <div className="w-full h-full flex flex-col gap-2">
          <SmallCardsStats/>
          <div
            style={{
              background: colorBgContainer,
              borderRadius: borderRadius,
            }}
            className="w-full h-[500px] p-4"
          />
          <div
            style={{
              background: colorBgContainer,
              borderRadius: borderRadius,
            }}
            className="w-full h-[500px] p-4"
          />
        </div>
        <div className="w-full h-full max-w-[500px] flex flex-col gap-2">
          <div
            style={{
              background: colorBgContainer,
              borderRadius: borderRadius,
            }}
            className="w-full h-[500px] p-4"
          />
          <div
            style={{
              background: colorBgContainer,
              borderRadius: borderRadius,
            }}
            className="w-full h-full p-4"
          />
        </div>
      </div>
    </>
  );
}
