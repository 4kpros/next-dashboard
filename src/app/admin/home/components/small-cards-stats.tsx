"use client";

import { theme } from "antd";
import React from "react";

export default function SmallCardsStats() {
  const {
    token: { colorBgContainer, borderRadius },
  } = theme.useToken();
  return (
    <div className="w-full flex items-start justify-between gap-2">
      <div
        style={{
          background: colorBgContainer,
          borderRadius: borderRadius,
        }}
        className="w-full p-4"
      >
        <h1 className="text-xl font-bold">50%</h1>
        <p>Percentage of success</p>
      </div>
      <div
        style={{
          background: colorBgContainer,
          borderRadius: borderRadius,
        }}
        className="w-full p-4"
      >
        <h1 className="text-xl font-bold">50%</h1>
        <p>Percentage of success</p>
      </div>
      <div
        style={{
          background: colorBgContainer,
          borderRadius: borderRadius,
        }}
        className="w-full p-4"
      >
        <h1 className="text-xl font-bold">50%</h1>
        <p>Percentage of success</p>
      </div>
      <div
        style={{
          background: colorBgContainer,
          borderRadius: borderRadius,
        }}
        className="w-full p-4"
      >
        <h1 className="text-xl font-bold">50%</h1>
        <p>Percentage of success</p>
      </div>
      <div
        style={{
          background: colorBgContainer,
          borderRadius: borderRadius,
        }}
        className="w-full p-4"
      >
        <h1 className="text-xl font-bold">50%</h1>
        <p>Percentage of success</p>
      </div>
    </div>
  );
}
