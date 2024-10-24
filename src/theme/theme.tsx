"use client";

import React from "react";
import { ConfigProvider, theme } from "antd";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "500",
  style: "normal",
  preload: true,
});

const CustomThemeProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const darkMode = false;
  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          // Colors primary
          colorPrimary: darkMode ? "#568274" : "#568274",
          colorPrimaryBg: darkMode ? "#56827433" : "#56827433",
          colorPrimaryBgHover: darkMode ? "#56827450" : "#56827450",
          // Colors container & secondary
          colorBgContainer: darkMode ? "#0b0e0d" : "#ffffff", // Card, container
          colorBgBase: darkMode ? "#181d1b" : "#fcfdfd", // Body
          colorBgElevated: darkMode ? "#28312e" : "#fcfdfd", // Modal, popup
          colorBorderSecondary: darkMode
            ? "rgba(255, 255, 255, 0.05)"
            : "rgba(0, 0, 0, 0.05)",

          // Radius
          borderRadiusXS: 4,
          borderRadiusSM: 8,
          borderRadius: 12,
          borderRadiusLG: 14,

          // Shadow
          boxShadow: darkMode
            ? "rgba(255, 255, 255, 0.05) 0px 7px 29px 0px"
            : "rgba(0, 0, 0, 0.1) 0px 7px 29px 0px",
          boxShadowSecondary: darkMode
            ? "rgba(255, 255, 255, 0.05) 0px 7px 29px 0px"
            : "rgba(0, 0, 0, 0.1) 0px 7px 29px 0px",
          boxShadowTertiary: darkMode
            ? "rgba(255, 255, 255, 0.05) 0px 7px 29px 0px"
            : "rgba(0, 0, 0, 0.1) 0px 7px 29px 0px",

          // Font
          fontFamily: roboto.style.fontFamily,
          // fontSize: 16,
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default CustomThemeProvider;
