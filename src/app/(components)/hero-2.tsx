import { theme as antdTheme } from "antd";
import Hero2Card, { Hero2CardType } from "./hero-2-card";
import ManagerIcon from "@/components/icons/hugeicons/manager";
import MessageIcon from "@/components/icons/hugeicons/message";
import ComputerVideoCallIcon from "@/components/icons/hugeicons/computer-video-call";

export default function Hero2() {
  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  return (
    <section>
      <div className="w-full flex flex-col items-center justify-center gap-8">
        <div className="w-full flex flex-col items-center justify-center text-center gap-6">
          <p
            style={{
              color: theme.colorPrimary,
            }}
            className="w-auto font-semibold"
          >
            Benefits
          </p>
          <h1 className="w-full max-w-[600px] text-4xl font-semibold">
            The smart choice for your school
          </h1>
          <p className="w-auto max-w-[400px] leading-relaxed">
            Everything you need to simplify, boost productivity and keep your
            team aligned
          </p>
        </div>
        <div className="flex flex-wrap -m-4">
          {items.map((item, index) => (
            <Hero2Card item={item} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

const items: Hero2CardType[] = [
  {
    icon: <ManagerIcon className="text-white" />,
    title: "Management",
    subtitle:
      "Enhance your school's efficiency and transparency with our robust school management system. Manage staff, track student progress and streamline operations.",
    actionText: "Learn more",
    actionHref: "#contact",
  },
  {
    icon: <MessageIcon className="text-white" />,
    title: "Forums",
    subtitle:
      "Our forum feature fosters a vibrant community where students and teachers can connect, share ideas, and collaborate on projects.",
    actionText: "Learn more",
    actionHref: "#contact",
  },
  {
    icon: <ComputerVideoCallIcon className="text-white" />,
    title: "Meetings",
    subtitle:
      "Allows teachers and students to easily schedule and manage one-on-one or group sessions, making it simple to book, confirm, and remind users.",
    actionText: "Learn more",
    actionHref: "#contact",
  },
];
