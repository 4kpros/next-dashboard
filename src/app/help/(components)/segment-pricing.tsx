"use client";

import { theme as antdTheme } from "antd";
import { SearchProps } from "antd/es/input/Search";
import { useRouter } from "next/navigation";

export default function SegmentPricing(props: {
  onSearch?: SearchProps["onSearch"];
  onSearchAudioRequested?: () => void;
}) {
  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  // React hooks
  const router = useRouter();

  return (
    <div className="w-full mt-6">
      <div className="w-full flex flex-col items-center justify-center gap-12">
        PRICING
      </div>
    </div>
  );
}
