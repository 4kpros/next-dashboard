"use client";

import { theme } from "antd";
import Image from "next/image";

export default function HeroDirector() {
  const {
    token: { colorPrimary, borderRadius },
  } = theme.useToken();

  return (
    <section>
      <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
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
            src={"/images/pages/home/director.jpg"}
            alt=""
            width={720}
            height={720}
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="md:pt-8">
          <p
            style={{
              color: colorPrimary,
            }}
            className="text-center font-bold md:text-left"
          >
            Directors
          </p>

          <h1 className="mb-4 text-center text-2xl font-bold sm:text-3xl md:mb-6 md:text-left">
            Manage schools
          </h1>

          <p className="mb-6 sm:text-lg md:mb-8 opacity-75">
            Our platform allows school principals to securely log in and
            efficiently manage their institutions. With a user-friendly
            interface, they can oversee administrative tasks, track performance,
            and streamline communication within the school. All tools are
            designed to enhance operational efficiency and support informed
            decision-making.
          </p>

          <h2 className="mb-2 text-center text-xl font-semibold sm:text-2xl md:mb-4 md:text-left">
            Manage teachers
          </h2>

          <p className="mb-6 sm:text-lg md:mb-8 opacity-75">
            Manage staff, including teachers, with ease. They can monitor
            schedules, track performance, and handle staff assignments
            efficiently. This feature streamlines administrative workflows and
            fosters better coordination within the school.
          </p>
        </div>
      </div>
    </section>
  );
}
