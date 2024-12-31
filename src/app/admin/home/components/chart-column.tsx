import { Column } from "@ant-design/charts";

export default function ChartColumn(props: { title?: string }) {
  const config = {
    data: data,
    autoFit: true,
    xField: "type",
    yField: "value",
    colorField: "type",
    point: {
      shapeField: "circle",
      sizeField: -Infinity,
    },
    interaction: {
      elementSelect: false,
    },
    scale: {
      color: {
        // range: ["#15803d"],
        palette: "tableau10",
      },
    },
  };

  return (
    <>
      <h1 className="w-full font-medium text-lg mx-4 my-3">{props.title}</h1>
      <Column {...config} />
    </>
  );
}

const data = [
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
];
