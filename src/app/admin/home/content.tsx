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
        className="w-full grid grid-cols-1 xl:grid-cols-3 gap-2"
      >
        <div className="w-full h-full flex flex-col xl:col-span-2 gap-2">
          <SmallCardsStats />
          <div
            style={{
              backgroundColor: theme.colorBgContainer,
              borderRadius: theme.borderRadius,
            }}
            className="w-full border"
          >
            <ChartColumn title={"Percentage of success by school"}/>
          </div>
          <div
            style={{
              backgroundColor: theme.colorBgContainer,
              borderRadius: theme.borderRadius,
            }}
            className="w-full border"
          >
            <ChartBidirectionalBar title={"Percentage of success comparison between boys and girls"}/>
          </div>
        </div>
        <div className="w-full h-full flex flex-col gap-2">
          {/* <div
            style={{
              backgroundColor: theme.colorBgContainer,
              borderRadius: theme.borderRadius,
            }}
            className="w-full h-[435px] border"
          >
            <ChartGauge title={"This year so far"}/>
          </div> */}
          <div
            style={{
              backgroundColor: theme.colorBgContainer,
              borderRadius: theme.borderRadius,
            }}
            className="w-full border"
          >
            <ChartLine title={"All time users progression"}/>
          </div>
        </div>
      </div>
    </>
  );
}
