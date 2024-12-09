"use client";

import { message } from "antd";
import React, { ReactNode } from "react";

export default function ToastMessageContext({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [_, contextHolder] = message.useMessage();
  return (
    <>
      {contextHolder}
      {children}
    </>
  );
}
