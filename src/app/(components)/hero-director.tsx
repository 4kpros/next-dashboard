import {
  MotionRevealFromBottom,
  MotionRevealFromLeft,
  MotionRevealFromRight,
  MotionRevealFromTop,
} from "@/components/motion/reveal";
import { theme as antdTheme } from "antd";
import Image from "next/image";

export default function HeroDirector() {
  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  return (
    <section>
      <div className="w-full flex flex-col items-center justify-center gap-6">
        <MotionRevealFromTop>
          <p
            style={{
              color: theme.colorPrimary,
            }}
            className="text-center font-bold md:text-left underline underline-offset-8"
          >
            Directors
          </p>
        </MotionRevealFromTop>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MotionRevealFromLeft>
            <div
              style={{
                backgroundColor: theme.colorBgContainer,
                borderRadius: theme.borderRadius,
                boxShadow: "rgba(0, 0, 0, 0.04) 0px 10px 50px",
              }}
              className="w-full border hover:scale-[1.02] transition-all duration-150 ease-in-out p-4"
            >
              <h2 className="text-center md:text-left text-lg font-bold">
                Manage schools
              </h2>

              <p className="opacity-75 line-clamp-5 mt-2">
                Our platform allows school principals to securely log in and
                efficiently manage their institutions. With a user-friendly
                interface, they can oversee administrative tasks, track
                performance, and streamline communication within the school. All
                tools are designed to enhance operational efficiency and support
                informed decision-making.
              </p>
            </div>
          </MotionRevealFromLeft>

          <MotionRevealFromRight delay={0.25}>
            <div
              style={{
                backgroundColor: theme.colorBgContainer,
                borderRadius: theme.borderRadius,
                boxShadow: "rgba(0, 0, 0, 0.04) 0px 10px 50px",
              }}
              className="w-full h-full border hover:scale-[1.02] transition-all duration-150 ease-in-out p-4"
            >
              <h2 className="text-center md:text-left text-lg font-bold">
                Manage teachers
              </h2>

              <p className="opacity-75 line-clamp-5 mt-2">
                Manage staff, including teachers, with ease. They can monitor
                schedules, track performance, and handle staff assignments
                efficiently. This feature streamlines administrative workflows
                and fosters better coordination within the school.
              </p>
            </div>
          </MotionRevealFromRight>
        </div>
        <MotionRevealFromBottom>
          <div
            style={{
              borderRadius: theme.borderRadius,
            }}
            className="w-full"
          >
            <Image
              style={{
                borderRadius: theme.borderRadius,
                borderColor: theme.colorPrimaryBg,
              }}
              src={"/images/pages/home/director.png"}
              alt=""
              width={1080}
              height={1080}
              className="w-full object-contain hover:scale-[1.02] transition-all duration-150 ease-in-out object-center"
            />
          </div>
        </MotionRevealFromBottom>
      </div>
    </section>
  );
}
