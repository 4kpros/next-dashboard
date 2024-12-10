import { App } from "antd";
import { ReactNode } from "react";

export default function AntdApp({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <App>{children}</App>;
}
