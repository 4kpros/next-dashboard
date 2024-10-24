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
        algorithm: darkMode ? theme.darkAlgorithm : theme.compactAlgorithm,
        token: {
          // Colors primary
          colorPrimary: darkMode ? "#1ba3a9" : "#1ba3a9",
          colorPrimaryBg: darkMode ? "#062428" : "#e3f3f5",
          colorPrimaryBgHover: darkMode ? "#082c30" : "#d7e8e9",
          // Colors container & secondary
          colorBgContainer: darkMode
            ? "rgba(0, 0, 0, 0.5)"
            : "rgba(255, 255, 255, 0.65)",
          colorBgBase: darkMode ? "#041d1c" : "#f8fcfc", // Body
          colorBgElevated: darkMode ? "#2b4a4a" : "#f4fafb", // Modal, popup
          colorBorderSecondary: darkMode
            ? "rgba(255, 255, 255, 0.075)"
            : "rgba(0, 0, 0, 0.075)",

          // Radius
          borderRadius: 25,

          // Font
          fontFamily: roboto.style.fontFamily,
          fontSize: 16,
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default CustomThemeProvider;
