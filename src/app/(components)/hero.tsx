"use client";

import {
  FEATURE_ADMIN,
  FEATURE_DIRECTOR,
  FEATURE_PARENT,
  FEATURE_STUDENT,
  FEATURE_TEACHER,
} from "@/constants/feature";
import { Button, theme } from "antd";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Hero() {
  const session = useSession();
  const router = useRouter();
  const {
    token: { colorFillContent, borderRadius },
  } = theme.useToken();

  const action = () => {
    if (session.status !== "loading") {
      if (session.status == "authenticated") {
        switch (session?.data?.user?.feature ?? "") {
          case FEATURE_ADMIN:
            router.push("/admin/home");
            break;
          case FEATURE_DIRECTOR:
            router.push("/director/home");
            break;
          case FEATURE_TEACHER:
            router.push("/teacher/home");
            break;
          case FEATURE_STUDENT:
            router.push("/student/home");
            break;
          case FEATURE_PARENT:
            router.push("/parent/home");
            break;

          default:
            break;
        }
      } else {
        router.push("/auth/register");
      }
    }
  };

  return (
    <section
      style={{
        background: colorFillContent,
        borderRadius: borderRadius,
      }}
      className="w-full mt-6 p-6"
    >
      <div className="w-full flex flex-col items-center justify-center gap-12 pt-12">
        <div className="w-full flex flex-col items-center justify-center text-center gap-6">
          <h1 className="w-full max-w-[600px] text-4xl font-semibold">
            Effortless school management, anytime, anywhere
          </h1>
          <p className="w-auto max-w-[400px] leading-relaxed">
            Manage schools easily with an all-in-one platform designed for
            seamless education
          </p>
        </div>
        <div className="w-auto flex items-center justify-center gap-4">
          <Button
            size="large"
            type="primary"
            onClick={action}
            loading={session.status === "loading"}
            className="transition-all duration-200 ease-in-out"
          >
            {session.status === "loading"
              ? "Loading..."
              : session.status === "authenticated"
              ? "Go to the dashboard"
              : "Register now"}
          </Button>
          <Button size="large" onClick={() => router.push("#contact")}>
            Contact us
          </Button>
        </div>
        <Image
          style={{
            borderRadius: borderRadius,
          }}
          src={"/images/pages/home/hero.png"}
          alt=""
          width={1920}
          height={1920}
          className="w-full object-fill"
        />
      </div>
    </section>
  );
}
