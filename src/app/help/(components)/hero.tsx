"use client";

import { getDashboardPath } from "@/lib/links/dashboard";
import { AudioOutlined } from "@ant-design/icons";
import { Button, theme as antdTheme } from "antd";
import Search, { SearchProps } from "antd/es/input/Search";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Hero(props: {
  onSearch?: SearchProps["onSearch"];
  onSearchAudioRequested?: () => void;
}) {
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
    <section className="w-full mt-6">
      <div className="w-full flex flex-col items-center justify-center gap-12">
        <div className="w-full flex flex-col items-center justify-center text-center gap-6">
          <h1 className="w-full max-w-[600px] text-4xl font-semibold">
            Hello, and welcome to Digitchool. How can we help ?
          </h1>
          <p className="w-auto max-w-[400px] leading-relaxed">
            Manage schools easily with an all-in-one platform designed for
            seamless education
          </p>
        </div>
        <div className="w-auto flex items-center justify-center gap-4">
          {/* <div className="w-full max-w-[500px]">
            <Search
              placeholder="Input search text"
              enterButton="Search"
              size="large"
              suffix={
                <AudioOutlined
                  style={{
                    fontSize: 16,
                    color: theme.colorPrimary,
                  }}
                  onClick={props.onSearchAudioRequested}
                />
              }
              onSearch={props.onSearch}
            />
          </div> */}
        </div>
      </div>
    </section>
  );
}
