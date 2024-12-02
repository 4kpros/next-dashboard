"use client";

import { useRouter } from "next/navigation";
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

const partners: (string | null)[] = [null, null, null];

export default function PageContent() {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen flex flex-col gap-40">
        <CustomContainerXl>
          <Hero />
        </CustomContainerXl>
        <CustomContainer>
          <div className="w-full flex flex-col gap-40">
            <Hero2 />
            <div id="director">
              <HeroDirector />
            </div>
            <div id="teacher">
              <HeroTeacher />
            </div>
          </div>
        </CustomContainer>
        <Statistics />
        <CustomContainer>
          <div className="w-full flex flex-col gap-40">
            <div id="student">
              <HeroStudent />
            </div>
            <div id="parent">
              <HeroParent />
            </div>
            <div id="contact">
              <Contact />
            </div>
          </div>
        </CustomContainer>
      </div>
      <Footer />
    </>
  );
}
