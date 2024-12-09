"use client";

import { CustomContainerMd } from "@/components/container/custom-container";
import { useRouter } from "next/navigation";
import { Button, theme as antdTheme } from "antd";

export default function PageContent() {
  // React hooks
  const router = useRouter();

  // Ant design hooks
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  return (
    <>
      <CustomContainerMd>Unknown</CustomContainerMd>
    </>
  );
}
