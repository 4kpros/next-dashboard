"use client";

import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar/navbar";
import { CustomContainer } from "@/components/container/custom-container";
import Footer from "@/components/footer/footer";

const partners: (string | null)[] = [null, null, null];

export default function PageContent() {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen">
        <CustomContainer>
          <div className="w-full flex flex-col gap-12">
            <div id="home" className="w-full flex flex-col gap-4"></div>
            <div id="directors" className="w-full flex flex-col gap-4"></div>
            <div id="teachers" className="w-full flex flex-col gap-4"></div>
            <div id="students" className="w-full flex flex-col gap-4"></div>
            <div id="parents" className="w-full flex flex-col gap-4"></div>
          </div>
        </CustomContainer>
      </div>
      <Footer />
    </>
  );
}
