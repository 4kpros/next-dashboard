"use client";

import { theme } from "antd";
import Image from "next/image";

export default function HeroParent() {
  const {
    token: { borderRadius },
  } = theme.useToken();

  return (
    <section>
      <div className="grid gap-8 md:grid-cols-2 items-center lg:gap-12">
        <div className="w-full h-full max-w-screen-lg flex flex-col justify-center text-right gap-4">
          <h1 className="text-2xl font-bold sm:text-3x">Parents</h1>
          <p className="sm:text-lg opacity-75">
            Our parent portal provides a comprehensive overview of your child's
            academic progress, attendance, and extracurricular activities. Stay
            connected with your child's teachers and receive personalized
            updates on their performance.
          </p>
        </div>
        <div
          style={{
            borderRadius: borderRadius,
          }}
          className="w-full h-[500px] overflow-hidden shadow-lg md:h-auto"
        >
          <Image
            style={{
              borderRadius: borderRadius,
            }}
            src={"/images/pages/home/parent.jpg"}
            alt=""
            width={720}
            height={720}
            className="w-full h-72 object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
