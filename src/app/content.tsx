"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/navbar/navbar";
import { CustomContainer } from "@/components/container/custom-container";

const partners: (string | null)[] = [null, null, null];

export default function PageContent() {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen">
        <CustomContainer>
            <></>
        </CustomContainer>
      </div>
    </>
  );
}
