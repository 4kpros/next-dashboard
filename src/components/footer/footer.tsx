import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="shadow mt-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
        <Link
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
            <span className="self-center text-xl font-medium whitespace-nowrap text-primary">
              Digitschool
            </span>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0">
            <li>
              <Link href="#" className="hover:underline me-4 md:me-6">
                About
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline me-4 md:me-6">
                Licensing
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border sm:mx-auto lg:my-8" />
        <span className="block text-sm sm:text-center">
          © 2024{" "}
          <a href="https://digitschool.cm/" className="hover:underline">
            Digitschool
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
