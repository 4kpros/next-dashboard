import Image from "next/image";
import React from "react";

interface LogoHeaderType {
  height?: number;
  width?: number;
}

export default function LogoHeader({ height = 50, width = 50 }: LogoHeaderType) {
  return (
    <Image
      src={"/images/logo/logo-xs.png"}
      alt=""
      width={height}
      height={width}
    />
  );
}
