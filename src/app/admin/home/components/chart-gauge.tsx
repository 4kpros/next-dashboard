import { Gauge } from "@ant-design/charts";
import { theme as antdTheme } from "antd";

export default function ChartGauge(props: { title?: string }) {
  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  const config = {
    data: data,
    title: props.title,
    autoFit: true,
    legend: true,
    scale: {
      color: {
        range: [theme.colorPrimary, theme.colorPrimaryBg],
      },
    },
  };

  return <Gauge {...config} />;
}

const data = {
  target: 3,
  total: 9,
  name: "year",
};
