import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import CustomQueryClientProvider from "@/providers/tanstack";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import "../styles/modal.scss";
import AntdApp from "@/providers/antd-app";
import AntdTheme from "@/providers/antd-theme";

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
            <AntdRegistry>
              <AntdApp>
                <AntdTheme>
                  <CustomQueryClientProvider>
                    {children}
                  </CustomQueryClientProvider>
                </AntdTheme>
              </AntdApp>
            </AntdRegistry>
          </GoogleOAuthProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
