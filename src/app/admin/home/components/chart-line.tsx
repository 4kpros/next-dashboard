import { Line } from "@ant-design/charts";

export default function ChartLine() {
  return (
    <>
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
const config = {
  data,
  xField: "type",
  yField: "value",
  point: {
    shapeField: "square",
    sizeField: 4,
  },
  interaction: {
    tooltip: {
      marker: false,
    },
  },
  style: {
    lineWidth: 2,
  },
};
