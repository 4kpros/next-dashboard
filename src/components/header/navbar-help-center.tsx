"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CustomContainer } from "../container/custom-container";
import { Button } from "antd";
import { useSession } from "next-auth/react";
import { theme as antdTheme } from "antd";
import AvatarProfile from "../avatar/avatar-profile";

export default function NavbarHelpCenter() {
  // React hooks
  const router = useRouter();

  // Next hooks
  const session = useSession();

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  return (
    <nav className="w-full z-40">
      <CustomContainer>
        <div className="w-full flex flex-wrap items-center justify-between py-4">
          <Link
            style={{
              color: theme.colorText,
            }}
            href="/"
            className="flex items-center space-x-0"
          >
            <Image
              style={{ width: "40px", height: "40px", objectFit: "contain" }}
              width={40}
              height={40}
              src={"/images/logo/logo-xs.png"}
              className="me-2"
              alt="Logo"
            />
            <span className="self-center text-xl font-bold whitespace-nowrap text-primary">
              Digitschool
            </span>
          </Link>
          <div
            className="hidden w-full lg:block lg:w-auto"
            id="navbar-dropdown"
          >
            <ul className="flex flex-col justify-center items-center p-4 md:p-0 mt-4 d-lg md:space-x-6 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
              <li className="z-40">
                <Button size="large" onClick={() => router.push("#contact")}>
                  Submit a request
                </Button>
              </li>
              <li className="z-40">
                {session.status === "loading" ||
                session.status === "authenticated" ? (
                  <AvatarProfile />
                ) : (
                  <div className="w-auto flex gap-1">
                    <Button
                      size="large"
                      type="primary"
                      onClick={() => router.push("/auth/register")}
                    >
                      Sign up
                    </Button>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </CustomContainer>
    </nav>
  );
}
