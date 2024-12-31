import { Line } from "@ant-design/charts";
import { theme as antdTheme } from "antd";

export default function ChartLine(props: { title?: string }) {
  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  const config = {
    data: data,
    autoFit: true,
    xField: "type",
    yField: "value",
    colorField: "type",
    point: {
      shapeField: "circle",
      sizeField: 4,
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 1,
      gradient: "y",
    },
    scale: {
      color: {
        range: [theme.colorPrimary],
      },
    },
  };

  return (
    <>
      <h1 className="w-full font-medium text-lg mx-4 my-3">{props.title}</h1>
      <Line {...config} />
    </>
  );
}

const data = [
  { type: "2017", value: 340 },
  { type: "2018", value: 902 },
  { type: "2019", value: 1743 },
  { type: "2020", value: 4200 },
  { type: "2021", value: 8322 },
  { type: "2022", value: 18218 },
  { type: "2023", value: 26531 },
  { type: "2024", value: 58221 },
];
