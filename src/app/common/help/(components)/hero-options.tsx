"use client";

import CreditIcon from "@/components/icons/material/credit";
import HelpIcon from "@/components/icons/material/help";
import VideoSettingsIcon from "@/components/icons/material/video-settings";
import { getDashboardPath } from "@/lib/links/dashboard";
import { Avatar, Segmented, theme as antdTheme } from "antd";
import { SearchProps } from "antd/es/input/Search";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import SegmentStart from "./segment-start";
import SegmentFAQ from "./segment-faq";
import SegmentPricing from "./segment-pricing";

export default function HeroOptions(props: {
  onSearch?: SearchProps["onSearch"];
  onSearchAudioRequested?: () => void;
}) {
  // React hooks
  const router = useRouter();
  const [segmentValue, setSegmentValue] = useState<string | number>();

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

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
    <section className="w-full">
      <div className="w-full flex flex-col items-center justify-center gap-12">
        <Segmented
          options={segmentedItems}
          block
          onChange={setSegmentValue}
          className="w-full"
        />
        {segmentValue === "faq" ? (
          <SegmentFAQ />
        ) : segmentValue === "pricing" ? (
          <SegmentPricing />
        ) : (
          <SegmentStart />
        )}
      </div>
    </section>
  );
}

function SegmentedLabel(props: {
  item?: {
    icon?: ReactNode;
    label?: string;
  };
}) {
  return (
    <div className="w-full flex flex-col items-center justify-center p-4">
      {props.item?.icon}
      <p className="w-full line-clamp-1">{props.item?.label}</p>
    </div>
  );
}

const segmentedItems = [
  {
    label: (
      <SegmentedLabel
        item={{
          icon: <VideoSettingsIcon />,
          label: "Getting started",
        }}
      />
    ),
    value: "start",
  },
  {
    label: (
      <SegmentedLabel
        item={{
          icon: <CreditIcon />,
          label: "Pricing plans",
        }}
      />
    ),
    value: "pricing",
  },
  {
    label: (
      <SegmentedLabel
        item={{
          icon: <HelpIcon />,
          label: "FAQ",
        }}
      />
    ),
    value: "faq",
  },
];
