import { Gauge } from "@ant-design/charts";

export default function ChartGauge() {
  return <Gauge {...config} />;
}

const config = {
  autoFit: true,
  data: {
    target: 120,
    total: 400,
    name: "year",
  },
  legend: false,
};
