import ManagerIcon from "@/components/icons/hugeicons/manager";
import SchoolIcon from "@/components/icons/hugeicons/school";
import StudentsIcon from "@/components/icons/hugeicons/students";
import TeacherIcon from "@/components/icons/hugeicons/teacher";
import { theme as antdTheme } from "antd";
import { ReactNode } from "react";

interface SmallCardStatsType {
  icon: ReactNode;
  label: string;
  count: number;
}

export default function SmallCardsStats() {
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
        backgroundColor: theme.colorPrimaryBg,
        borderRadius: theme.borderRadius,
      }}
      className="w-full h-32 flex flex-col items-center justify-between gap-2 p-4"
    >
      <div className="w-full flex items-center gap-2">
        {props.item.icon}
        <h3 className="text-lg">{props.item.label}</h3>
      </div>
      <h1 className="text-3xl font-bold">{props.item.count}</h1>
    </div>
  );
}

const items: SmallCardStatsType[] = [
  {
    icon: <SchoolIcon width={50} height={50} />,
    label: "Schools",
    count: 7,
  },
  {
    icon: <ManagerIcon width={50} height={50} />,
    label: "Directors",
    count: 11,
  },
  {
    icon: <TeacherIcon width={50} height={50} />,
    label: "Teachers",
    count: 120,
  },
  {
    icon: <StudentsIcon width={50} height={50} />,
    label: "Students",
    count: 7061,
  },
];
