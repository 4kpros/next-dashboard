"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "antd";
import { useSession } from "next-auth/react";
import { theme as antdTheme } from "antd";
import AvatarProfile from "../avatar/avatar-profile";

const menus = [
  {
    label: "Home",
    link: "/",
  },
  {
    label: "Directors",
    link: "#directors",
  },
  {
    label: "Teachers",
    link: "#teachers",
  },
  {
    label: "Students",
    link: "#students",
  },
  {
    label: "Parents",
    link: "#parents",
  },
];
export default function Navbar() {
  // React hooks
  const router = useRouter();

  // Next hooks
  const session = useSession();

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  return (
    <nav className="w-full z-40">
      <div className="w-full flex flex-wrap items-center justify-between py-4">
        <div className="w-full max-w-44">
          <Link
            style={{
              color: theme.colorText,
            }}
            href="/"
            className="flex items-center space-x-0 line-clamp-1"
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
        </div>
        <div className="hidden w-full lg:block lg:w-auto" id="navbar-dropdown">
          <ul className="flex flex-col justify-center items-center p-4 md:p-0 mt-4 d-lg md:space-x-6 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            {menus.map((item) => {
              return (
                <li key={item.label}>
                  <Link
                    style={{
                      color: theme.colorText,
                    }}
                    href={item.link}
                    aria-current="page"
                    className="py-2 px-3 text-sm font-semibold opacity-75 transition-all"
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="w-full max-w-44 flex flex-wrap items-center lg:justify-end lg:text-end">
          {session.status === "loading" ||
          session.status === "authenticated" ? (
            <div className="w-auto flex items-center lg:justify-end lg:text-end gap-2">
              <p className="w-auto line-clamp-1">
                {session.data?.user?.firstName ?? "Unknown"}
              </p>
              <div>
                <AvatarProfile />
              </div>
            </div>
          ) : (
            <div className="w-auto flex gap-1">
              <Button size="large" onClick={() => router.push("/auth/login")}>
                Login
              </Button>
              <Button
                size="large"
                type="primary"
                onClick={() => router.push("/auth/register")}
              >
                Sign up
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
