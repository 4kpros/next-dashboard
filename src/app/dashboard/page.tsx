"use client";

import React from "react";
import { theme } from "antd";
import PageContent from "./content";

export default function Page() {
  const {
    token: { colorBgContainer, borderRadius },
  } = theme.useToken();

  return (
    <PageContent/>
    // <div
    //     style={{
    //       padding: 24,
    //       textAlign: "center",
    //       background: colorBgContainer,
    //       borderRadius: borderRadius,
    //       minHeight: "100vh",
    //     }}
    //   >
    //     <PageContent/>
    //   </div>
  );
}
