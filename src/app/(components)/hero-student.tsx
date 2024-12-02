"use client";

import { Button, theme } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HeroStudent() {
  const router = useRouter();
  const {
    token: { colorPrimary, borderRadius },
  } = theme.useToken();

  return (
    <section>
      <div className="w-full flex flex-col items-center justify-center gap-8">
        <div className="w-full flex flex-col items-center justify-center gap-6">
          <p
            style={{
              color: colorPrimary,
            }}
            className="text-center font-bold md:text-left"
          >
            Students
          </p>
          <Image
            style={{
              borderRadius: borderRadius,
            }}
            src={"/images/pages/home/student.jpg"}
            alt=""
            width={1920}
            height={600}
            className="w-full h-[300px] object-cover object-center"
          />
        </div>
        <div className="w-full max-w-[720px] flex flex-col items-center justify-center">
          <p className="leading-relaxed text-lg text-center">
            Our student management system is designed to revolutionize the way
            students interact with their school. With a user-friendly interface
            and intuitive features, our platform empowers students to take
            control of their learning journey and engage with their education in
            a more meaningful way.
          </p>
        </div>
      </div>
    </section>
  );
}
