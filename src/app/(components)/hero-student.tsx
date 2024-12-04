import { theme as antdTheme } from "antd";
import Image from "next/image";

export default function HeroStudent() {
  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  return (
    <section>
      <div className="w-full flex flex-col items-center justify-center gap-8">
        <div className="w-full flex flex-col items-center justify-center gap-6">
          <p
            style={{
              color: theme.colorPrimary,
            }}
            className="text-center font-bold md:text-left"
          >
            Students
          </p>
          <Image
            style={{
              borderRadius: theme.borderRadius,
            }}
            src={"/images/pages/home/student.jpg"}
            alt=""
            width={1280}
            height={1280}
            className="w-full h-[300px] object-cover object-center"
          />
        </div>
        <div className="w-full max-w-[720px] flex flex-col items-center justify-center">
          <p className="leading-relaxed text-lg text-center">
            Our student management system is designed to revolutionize the way
            students interact with their school. With a user-friendly interface
            and intuitive features, our platform empowers students to take
            control of their learning journey and engage with their education in
            a more meaningful way.
          </p>
        </div>
      </div>
    </section>
  );
}
