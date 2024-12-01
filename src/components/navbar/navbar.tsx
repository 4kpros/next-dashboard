"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CustomContainer } from "../container/custom-container";
import { Button } from "antd";

const menus = [
  {
    label: "Home",
    link: "/",
  },
  {
    label: "Directors",
    link: "#director",
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
  const pathName = usePathname();
  const router = useRouter();

  const navigateToPage = (path: string) => {
    router.push(path);
  };
  return (
    <nav className="bg-white border-b">
      <CustomContainer>
        <div className="w-full flex flex-wrap items-center justify-between py-2">
          <Link
            href="/"
            className="flex items-center space-x-0"
          >
            <Image
              style={{ width: "60px", height: "60px", objectFit: "contain" }}
              width={60}
              height={60}
              src={"/images/logo/logo-xs.png"}
              className="me-2"
              alt="Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap text-primary">
              Digitschool
            </span>
          </Link>
          {/* <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  data-collapse-toggle="navbar-dropdown"
                  variant={"outline"}
                  className="inline-flex items-center p-2 w-10 h-10 justify-center border-black/10"
                  aria-controls="navbar-dropdown"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 17 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 1h15M1 7h15M1 13h15"
                    />
                  </svg>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex flex-col justify-center mt-12 gap-4">
                  {menus.map((item, index) => {
                    return (
                      <SheetClose asChild key={index}>
                        <Link
                          href={item.link}
                          aria-current="page"
                          className={`font-medium text-xl transition-all 
                                    ${
                                      item.link === pathName
                                        ? "text-primary underline underline-offset-4"
                                        : "text-primary/50"
                                    }
                                    `}
                        >
                          {item.label}
                        </Link>
                      </SheetClose>
                    );
                  })}
                  <SheetClose asChild>
                    <Button onClick={navigateToContactPage}>Contact us</Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div> */}
          <div
            className="hidden w-full lg:block lg:w-auto"
            id="navbar-dropdown"
          >
            <ul className="flex flex-col justify-center items-center font-medium p-4 md:p-0 mt-4 d-lg md:space-x-6 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
              {menus.map((item) => {
                return (
                  <li key={item.label}>
                    <Link
                      href={item.link}
                      aria-current="page"
                      className={`py-2 px-3 font-semibold transition-all 
                                        ${
                                          item.link === pathName
                                            ? "text-primary underline underline-offset-4"
                                            : "text-primary/50"
                                        }
                                        `}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              <li>
                <Button onClick={() => navigateToPage("/auth/register")}>Sign up</Button>
              </li>
              <li>
                <Button type="primary" onClick={() => navigateToPage("/auth/login")}>Login</Button>
              </li>
            </ul>
          </div>
        </div>
      </CustomContainer>
    </nav>
  );
}