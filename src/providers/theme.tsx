import { ConfigProvider, theme } from "antd";
import { Roboto } from "next/font/google";
import { ReactNode } from "react";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "500",
  style: "normal",
});

const CustomThemeProvider = ({
  children,
}: Readonly<{ children: ReactNode }>) => {
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
            ? "rgba(255, 255, 255, 0.15)"
            : "rgba(0, 0, 0, 0.15)",

          // Radius
          borderRadius: 10,

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
          // fontSize: 15,
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default CustomThemeProvider;
