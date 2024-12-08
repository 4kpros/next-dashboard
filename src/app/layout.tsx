import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";

import CustomThemeProvider from "../providers/theme";

import "../styles/globals.css";
import "../styles/modal.scss";
import CustomQueryClientProvider from "@/providers/tanstack";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Digitschool",
  description: "School management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID || ""}>
            <CustomQueryClientProvider>
              <AntdRegistry>
                <CustomThemeProvider>{children}</CustomThemeProvider>
              </AntdRegistry>
            </CustomQueryClientProvider>
          </GoogleOAuthProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
