"use client";

import { theme as antdTheme } from "antd";
import { useRouter } from "next/navigation";

export default function SegmentPricing() {
  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  // React hooks
  const router = useRouter();

  return (
    <div className="w-full mt-6">
      <div className="w-full min-h-[600px] flex flex-col items-center gap-12">
        <h1 className="w-full max-w-screen-sm text-center text-4xl font-semibold">
          Pricing
        </h1>
        <p>Coming soon!</p>
      </div>
    </div>
  );
}
