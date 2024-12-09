"use client";

import Navbar from "@/components/header/navbar";
import {
  CustomContainer,
  CustomContainerXl,
} from "@/components/container/custom-container";
import { theme as antdTheme } from "antd";
import Footer from "@/components/footer/footer";
import Hero from "./(components)/hero";
import HeroBenefits from "./(components)/hero-benefits";
import HeroDirector from "./(components)/hero-director";
import HeroTeacher from "./(components)/hero-teacher";
import HeroStudent from "./(components)/hero-student";
import HeroParent from "./(components)/hero-parent";
import Contact from "../components/sections/contact";
import Statistics from "./(components)/statistics";
import { useEffect, useState } from "react";
import { MotionRevealFromBottom } from "@/components/motion/reveal";

export default function PageContent() {
  // React hooks
  const [scrollYPosition, setScrollYPosition] = useState(0);

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  const handleScroll = () => {
    const newScrollYPosition = window.scrollY;
    setScrollYPosition(newScrollYPosition);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <CustomContainer>
        <Navbar />
      </CustomContainer>
      <div
        className={`w-full fixed top-0 left-0 transition-all duration-200 ease-in-out z-30 ${
          scrollYPosition >= 500 ? "opacity-100 z-30" : "opacity-0 -z-10"
        }`}
      >
        <CustomContainerXl>
          <div
            style={{
              borderRadius: theme.borderRadius,
              backgroundColor: theme.colorBgContainer,
              boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px"
            }}
            className="w-full border my-2 px-6"
          >
            <Navbar />
          </div>
        </CustomContainerXl>
      </div>
      <div className="w-full min-h-screen flex flex-col gap-40">
        <CustomContainerXl>
          <Hero />
        </CustomContainerXl>
        <CustomContainer>
          <div className="w-full flex flex-col gap-16">
            <MotionRevealFromBottom>
              <HeroBenefits />
            </MotionRevealFromBottom>
            <div id="directors" className="pt-24">
              <HeroDirector />
            </div>
            <div id="teachers" className="pt-24">
              <HeroTeacher />
            </div>
          </div>
        </CustomContainer>
        <Statistics />
        <CustomContainer>
          <div className="w-full flex flex-col gap-16">
            <div id="students" className="">
              <HeroStudent />
            </div>
            <div id="parents" className="pt-24">
              <HeroParent />
            </div>
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
