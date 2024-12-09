import {
  MotionRevealFromBottom,
  MotionRevealFromLeft,
  MotionRevealFromRight,
  MotionRevealFromTop,
} from "@/components/motion/reveal";
import { theme as antdTheme, Button } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HeroStudent() {
  // React hooks
  const router = useRouter();

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  return (
    <section>
      <div className="w-full flex flex-col items-center justify-center gap-8">
        <div className="w-full flex flex-col items-center justify-center">
          <MotionRevealFromTop>
            <p
              style={{
                color: theme.colorPrimary,
              }}
              className="text-center font-bold md:text-left underline underline-offset-8"
            >
              Students
            </p>
          </MotionRevealFromTop>
        </div>

        <div className="grid gap-8 md:grid-cols-2 items-center lg:gap-6">
          <MotionRevealFromRight>
            <div
              style={{
                backgroundColor: theme.colorBgContainer,
                borderRadius: theme.borderRadius,
                boxShadow: "rgba(0, 0, 0, 0.04) 0px 10px 50px",
              }}
              className="w-full h-[200px] border"
            >
              <div
                style={{
                  backgroundColor: theme.colorFillContent,
                  borderRadius: theme.borderRadius,
                }}
                className="w-full h-full"
              ></div>
            </div>
          </MotionRevealFromRight>

          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MotionRevealFromRight>
              <div
                style={{
                  backgroundColor: theme.colorBgContainer,
                  borderRadius: theme.borderRadius,
                  boxShadow: "rgba(0, 0, 0, 0.04) 0px 10px 50px",
                }}
                className="w-full h-full border hover:scale-[1.02] transition-all duration-150 ease-in-out p-4"
              >
                <h2 className="text-center md:text-left text-lg font-bold">
                  Programs
                </h2>

                <p className="opacity-75 line-clamp-5 mt-2">
                  Manage your academic programs with ease. Access course
                  details, schedules, and important updates all in one place.
                </p>
              </div>
            </MotionRevealFromRight>

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
                  Courses
                </h2>

                <p className="opacity-75 line-clamp-5 mt-2">
                  Keep track of your courses with ease. Access schedules,
                  materials, and updates to stay ahead in your studies.
                </p>
              </div>
            </MotionRevealFromRight>
          </div>

          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MotionRevealFromLeft>
              <div
                style={{
                  backgroundColor: theme.colorBgContainer,
                  borderRadius: theme.borderRadius,
                  boxShadow: "rgba(0, 0, 0, 0.04) 0px 10px 50px",
                }}
                className="w-full h-full border hover:scale-[1.02] transition-all duration-150 ease-in-out p-4"
              >
                <h2 className="text-center md:text-left text-lg font-bold">
                  Meeting & forum
                </h2>

                <p className="opacity-75 line-clamp-5 mt-2">
                  Never miss a session and stay updated on key discussions and
                  announcements.
                </p>
              </div>
            </MotionRevealFromLeft>

            <MotionRevealFromLeft delay={0.25}>
              <div
                style={{
                  backgroundColor: theme.colorBgContainer,
                  borderRadius: theme.borderRadius,
                  boxShadow: "rgba(0, 0, 0, 0.04) 0px 10px 50px",
                }}
                className="w-full h-full border hover:scale-[1.02] transition-all duration-150 ease-in-out p-4"
              >
                <h2 className="text-center md:text-left text-lg font-bold">
                  Exams & results
                </h2>

                <p className="opacity-75 line-clamp-5 mt-2">
                  Follow your exam schedules and results closely. Get timely
                  updates on scores and progress to stay on top of your studies.
                </p>
              </div>
            </MotionRevealFromLeft>
          </div>
          <MotionRevealFromRight>
            <div
              style={{
                backgroundColor: theme.colorBgContainer,
                borderRadius: theme.borderRadius,
                boxShadow: "rgba(0, 0, 0, 0.04) 0px 10px 50px",
              }}
              className="w-full h-[200px] border"
            >
              <div
                style={{
                  backgroundColor: theme.colorFillContent,
                  borderRadius: theme.borderRadius,
                }}
                className="w-full h-full border"
              ></div>
            </div>
          </MotionRevealFromRight>
        </div>
      </div>
    </section>
  );
}
