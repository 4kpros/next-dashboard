import ManagerIcon from "@/components/icons/material/manager";
import SchoolIcon from "@/components/icons/material/school";
import StudentIcon from "@/components/icons/material/student";
import SupervisorIcon from "@/components/icons/material/supervisor";
import { theme as antdTheme } from "antd";
import { ReactNode } from "react";

interface SmallCardStatsType {
  icon: ReactNode;
  label: string;
  count: number;
}

export default function StatisticSection() {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
      {items.map((item, index) => (
        <ItemCard item={item} key={index} />
      ))}
    </div>
  );
}

function ItemCard(props: { item: SmallCardStatsType }) {
  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  return (
    <div
      style={{
        borderRadius: theme.borderRadius,
        color: theme.colorPrimary,
        backgroundColor: theme.colorPrimaryBg,
      }}
      className="w-full h-32 flex flex-row items-center justify-between background-pattern-white gap-2 p-4"
    >
      <div
        style={{
          borderRadius: theme.borderRadius,
          // backgroundColor: theme.colorBgContainer,
        }}
        className="w-auto h-auto flex flex-col items-center justify-center bg-white/50 backdrop-blur-xl p-2"
      >
        {props.item.icon}
      </div>
      <div className="w-full flex flex-col gap-2">
        <h1 className="text-4xl font-bold">{props.item.count}</h1>
        <h3 className="text-lg opacity-75">{props.item.label}</h3>
      </div>
    </div>
  );
}

const items: SmallCardStatsType[] = [
  {
    icon: <SchoolIcon width={40} height={40} />,
    label: "Schools",
    count: 7,
  },
  {
    icon: <ManagerIcon width={40} height={40} />,
    label: "Directors",
    count: 11,
  },
  {
    icon: <SupervisorIcon width={40} height={40} />,
    label: "Teachers",
    count: 120,
  },
  {
    icon: <StudentIcon width={40} height={40} />,
    label: "Students",
    count: 7061,
  },
];
