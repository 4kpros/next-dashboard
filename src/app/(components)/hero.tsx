"use client";

import { getDashboardPath } from "@/utils/redirect/dashboard";
import { Button, theme as antdTheme } from "antd";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Hero() {
  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  // React hooks
  const router = useRouter();

  // Next hooks
  const session = useSession();

  const action = () => {
    if (session.status == "authenticated") {
      router.push(getDashboardPath(session?.data?.user?.feature ?? ""));
    } else {
      router.push("/auth/register");
    }
  };

  return (
    <section
      style={{
        backgroundColor: theme.colorPrimaryBg,
        borderRadius: theme.borderRadius,
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
            borderRadius: theme.borderRadius,
            borderColor: theme.colorPrimary,
            boxShadow: "",
          }}
          src={"/images/pages/home/hero.png"}
          alt=""
          width={1920}
          height={1920}
          className="w-full object-fill border"
        />
      </div>
    </section>
  );
}
