"use client";

import { theme as antdTheme } from "antd";
import SmallCardsStats from "./components/small-cards-stats";
import ChartLine from "./components/chart-line";
import ChartColumn from "./components/chart-column";
import ChartBidirectionalBar from "./components/chart-bidirectional-bar";
import ChartGauge from "./components/chart-gauge";

export default function PageContent() {
  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  return (
    <>
      <div
        style={{
          padding: "15px",
          minHeight: "100vh",
        }}
        className="w-full flex flex-col xl:flex-row items-start justify-between gap-2"
      >
        <div className="w-full h-full flex flex-col gap-2">
          <SmallCardsStats />
          <div
            style={{
              backgroundColor: theme.colorBgContainer,
              borderRadius: theme.borderRadius,
            }}
            className="w-full h-[400px] border"
          >
            <ChartColumn />
          </div>
          <div
            style={{
              backgroundColor: theme.colorBgContainer,
              borderRadius: theme.borderRadius,
            }}
            className="w-full h-[400px] border"
          >
            <ChartBidirectionalBar />
          </div>
        </div>
        <div className="w-full h-full max-w-[500px] flex flex-col gap-2">
          <div
            style={{
              backgroundColor: theme.colorBgContainer,
              borderRadius: theme.borderRadius,
            }}
            className="w-full h-[435px] border"
          >
            <ChartGauge />
          </div>
          <div
            style={{
              backgroundColor: theme.colorBgContainer,
              borderRadius: theme.borderRadius,
            }}
            className="w-full h-[500px] border"
          >
            <ChartLine />
          </div>
        </div>
      </div>
    </>
  );
}
