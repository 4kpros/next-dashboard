"use client";

import { theme as antdTheme } from "antd";
import { CustomContainer } from "@/components/container/custom-container";
import NavbarHelpCenter from "@/components/header/navbar-help-center";
import Footer from "@/components/footer/footer";
import Contact from "@/components/sections/contact";
import { MotionRevealFromBottom } from "@/components/motion/reveal";
import { MotionPageTransitionFromTop } from "@/components/motion/motion-page";

export default function Page({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  return (
    <MotionPageTransitionFromTop>
      <NavbarHelpCenter />
      <div className="w-full min-h-screen flex flex-col gap-40">
        <CustomContainer>
          <div
            style={{
              backgroundColor: theme.colorBgContainer,
              borderRadius: theme.borderRadius,
            }}
            className="w-full border my-6 px-6 py-12 gap-6"
          >
            {children}
          </div>
          <div className="w-full flex flex-col gap-16">
            <div id="contact" className="pt-24">
              <MotionRevealFromBottom>
                <Contact />
              </MotionRevealFromBottom>
            </div>
          </div>
        </CustomContainer>
      </div>
      <Footer />
    </MotionPageTransitionFromTop>
  );
}
