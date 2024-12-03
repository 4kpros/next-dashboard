import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";

import CustomThemeProvider from "../providers/theme";

import "../styles/globals.css";
import "../styles/modal.scss";
import CustomQueryClientProvider from "@/providers/tanstack-client-provider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Digitschool",
  description: "Scholl management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <AntdRegistry>
          <CustomThemeProvider>
            <SessionProvider>
              <CustomQueryClientProvider>
                <GoogleOAuthProvider
                  clientId={process.env.GOOGLE_CLIENT_ID || ""}
                >
                  {children}
                </GoogleOAuthProvider>
              </CustomQueryClientProvider>
            </SessionProvider>
            ;
          </CustomThemeProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
