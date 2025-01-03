import { BidirectionalBar } from "@ant-design/charts";

export default function ChartBidirectionalBar(props: { title?: string }) {
  const config = {
    data: data,
    autoFit: true,
    layout: "horizontal",
    xField: "country",
    yField: ["Boys", "Girls"],
    colorField: "type",
    interaction: {
      elementSelect: false,
    },
    style: {
      fill: (item: any) => {
        return item.groupKey === "Girls" ? "#f1a7b4" : "#25c5da";
      },
    },
  };

  return (
    <>
      <h1 className="w-full font-medium text-lg mx-4 my-3">{props.title}</h1>
      <BidirectionalBar {...config} />
    </>
  );
}

const data = [
  {
    country: "A",
    Boys: 13.4,
    Girls: 12.3,
  },
  {
    country: "B",
    Boys: 14.4,
    Girls: 6.3,
  },
  {
    country: "C",
    Boys: 18.4,
    Girls: 8.3,
  },
  {
    country: "D",
    Boys: 34.4,
    Girls: 13.8,
  },
  {
    country: "E",
    Boys: 44.4,
    Girls: 19.5,
  },
  {
    country: "F",
    Boys: 24.4,
    Girls: 18.8,
  },
  {
    country: "G",
    Boys: 54.4,
    Girls: 24.7,
  },
  {
    country: "H",
    Boys: 104.4,
    Girls: 5.3,
  },
  {
    country: "I",
    Boys: 165.2,
    Girls: 72.9,
  },
];
