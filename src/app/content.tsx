"use client";

import Navbar from "@/components/navbar/navbar";
import {
  CustomContainer,
  CustomContainerXl,
} from "@/components/container/custom-container";
import Footer from "@/components/footer/footer";
import Hero from "./(components)/hero";
import Hero2 from "./(components)/hero-2";
import HeroDirector from "./(components)/hero-director";
import HeroTeacher from "./(components)/hero-teacher";
import HeroStudent from "./(components)/hero-student";
import HeroParent from "./(components)/hero-parent";
import Contact from "./(components)/contact";
import Statistics from "./(components)/statistics";
import { useEffect, useState } from "react";
import NavbarFixed from "@/components/navbar/navbar-fixed";

export default function PageContent() {
  const [scrollYPosition, setScrollYPosition] = useState(0);

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
      <Navbar />
      <div
        className={`w-full fixed top-0 left-0 transition-all duration-200 ease-in-out z-30 ${
          scrollYPosition >= 500 ? "h-auto opacity-100 z-30" : "h-0 opacity-0 -z-10"
        }`}
      >
        <NavbarFixed />
      </div>
      <div className="w-full min-h-screen flex flex-col gap-40">
        <CustomContainerXl>
          <Hero />
        </CustomContainerXl>
        <CustomContainer>
          <div className="w-full flex flex-col gap-16">
            <Hero2 />
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
            <div id="students" className="pt-24">
              <HeroStudent />
            </div>
            <div id="parents" className="pt-24">
              <HeroParent />
            </div>
            <div id="contact" className="pt-24">
              <Contact />
            </div>
          </div>
        </CustomContainer>
      </div>
      <Footer />
    </>
  );
}
