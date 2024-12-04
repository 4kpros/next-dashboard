"use client";

import { CustomContainerFullHeight } from "@/components/container/custom-container";
import { Button, theme } from "antd";
import { useRouter } from "next/navigation";

export default function PageContent() {
  const router = useRouter();
  const {
    token: { colorBgContainer, borderRadius },
  } = theme.useToken();

  return (
    <CustomContainerFullHeight>
      <div
        style={{
          background: colorBgContainer,
          borderRadius: borderRadius,
        }}
        className="w-full flex item-center justify-center mt-4"
      >
        <Button
          htmlType="submit"
          color="primary"
          variant="filled"
          onClick={() => router.push("/")}
        >
          Back to the website
        </Button>
      </div>
    </CustomContainerFullHeight>
  );
}
