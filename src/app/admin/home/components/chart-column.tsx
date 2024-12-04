import { Column } from "@ant-design/charts";

export default function ChartColumn() {
  return (
    <>
      <Column {...config} />
    </>
  );
}

const config = {
  data: [
    { type: "A", value: 3221 },
    { type: "B", value: 6593 },
    { type: "C", value: 4803 },
    { type: "D", value: 7034 },
    { type: "E", value: 1109 },
    { type: "F", value: 839 },
    { type: "H", value: 277 },
    { type: "I", value: 8290 },
    { type: "J", value: 3772 },
    { type: "K", value: 5239 },
    { type: "L", value: 3765 },
  ],
  xField: "type",
  yField: "value",
  colorField: "type",
  state: {
    unselected: { opacity: 0.5 },
    selected: { lineWidth: 3, stroke: "red" },
  },
  interaction: {
    elementSelect: true,
  },
};
