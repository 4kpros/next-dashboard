import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";

import CustomThemeProvider from "../theme/theme";

import "../styles/globals.css";
import "../styles/modal.scss";

export const metadata: Metadata = {
  title: "Application name",
  description: "Description",
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
