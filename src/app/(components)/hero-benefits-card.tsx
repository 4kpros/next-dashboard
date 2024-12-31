import { ArrowRightOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { theme as antdTheme } from "antd";
import Link from "next/link";
import { ReactNode } from "react";

export interface HeroBenefitsCardType {
  icon: ReactNode | null;
  title: string | null;
  subtitle: string | null;
  actionText: string | null;
  actionHref: string | null;
}

export default function HeroBenefitsCard(props: {
  item: HeroBenefitsCardType;
}) {
  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  return (
    <div className="p-4 md:w-1/3">
      <div
        style={{
          backgroundColor: theme.colorBgContainer,
          borderRadius: theme.borderRadius,
          boxShadow: "rgba(0, 0, 0, 0.04) 0px 10px 50px",
        }}
        className="w-full h-full border flex flex-col hover:scale-[1.02] transition-all duration-150 ease-in-out p-8"
      >
        <div className="flex items-center mb-3">
          <div
            style={{
              backgroundColor: theme.colorPrimary,
            }}
            className="w-8 h-8 p-[6px] mr-3 inline-flex items-center justify-center rounded-full flex-shrink-0"
          >
            {props.item.icon ?? <InfoCircleOutlined />}
          </div>
          <h2 className="text-lg font-bold">{props.item.title ?? "Title"}</h2>
        </div>
        <div className="flex-grow">
          <p className="leading-relaxed text-base">
            {props.item.subtitle ?? "Subtitle"}
          </p>
          <Link
            style={{
              color: theme.colorPrimary,
            }}
            href={props.item.actionHref ?? ""}
            className="mt-3 inline-flex items-center"
          >
            <span className="mr-1">
              {props.item.actionText ?? "Action text"}
            </span>{" "}
            <ArrowRightOutlined />
          </Link>
        </div>
      </div>
    </div>
  );
}
