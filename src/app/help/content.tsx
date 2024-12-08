"use client";

import { getDashboardPath } from "@/lib/links/dashboard";
import { theme as antdTheme } from "antd";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CustomContainer } from "@/components/container/custom-container";
import NavbarHelpCenter from "@/components/header/navbar-help-center";
import Footer from "@/components/footer/footer";
import Hero from "./(components)/hero";
import HeroOptions from "./(components)/hero-options";
import Contact from "@/components/sections/contact";
import { MotionRevealFromBottom } from "@/components/motion/reveal";

export default function PageContent() {
  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  // React hooks
  const router = useRouter();
  const [requestModalOpen, setUpdateInfoModalOpen] = useState(false);

  // Next hooks
  const session = useSession();

  const action = () => {
    if (session.status == "authenticated") {
      router.push(getDashboardPath(session?.data?.user?.feature ?? ""));
    }
  };

  return (
    <>
      <NavbarHelpCenter />
      <div className="w-full min-h-screen flex flex-col gap-40">
        <CustomContainer>
          <div
            style={{
              backgroundColor: theme.colorBgContainer,
              borderRadius: theme.borderRadius,
            }}
            className="w-full border mt-6 px-6 py-12 gap-6"
          >
            <Hero />
            <HeroOptions />
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
    </>
  );
}
