import { theme as antdTheme } from "antd";
import Image from "next/image";

export interface HeroTeacherCardType {
  image: string | null;
  title: string | null;
  subtitle: string | null;
}

export default function HeroTeacherCard(props: { item: HeroTeacherCardType }) {
  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  return (
    <div
      style={{
        backgroundColor: theme.colorBgContainer,
        borderRadius: theme.borderRadius,
      }}
      className="w-full border hover:scale-[1.02] transition-all duration-150 ease-in-out p-4"
    >
      <Image
        style={{
          borderRadius: theme.borderRadius,
        }}
        src={props.item.image ?? ""}
        alt=""
        width={200}
        height={200}
        className="w-full h-48 object-cover object-center mb-6"
      />
      <h3
        style={{
          color: theme.colorPrimary,
        }}
        className="tracking-widest text-sm font-medium"
      >
        {props.item.title}
      </h3>
      <p className="leading-relaxed text-base">{props.item.subtitle}</p>
    </div>
  );
}
