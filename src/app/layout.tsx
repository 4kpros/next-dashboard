import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";

import CustomThemeProvider from "../theme/theme";

import "../styles/globals.css";
import "../styles/modal.scss";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <CustomThemeProvider>{children}</CustomThemeProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
