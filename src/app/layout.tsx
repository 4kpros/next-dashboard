import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import CustomQueryClientProvider from "@/providers/tanstack";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SessionProvider } from "next-auth/react";
import AntdTheme from "@/providers/antd-theme";

import "../styles/globals.css";
import "../styles/modal.scss";

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
          <AntdRegistry>
            <AntdTheme>
              <CustomQueryClientProvider>
                <GoogleOAuthProvider
                  clientId={process.env.GOOGLE_CLIENT_ID || ""}
                >
                  {children}
                </GoogleOAuthProvider>
              </CustomQueryClientProvider>
            </AntdTheme>
          </AntdRegistry>
        </SessionProvider>
      </body>
    </html>
  );
}
