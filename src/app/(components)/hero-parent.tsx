import {
  MotionRevealFromBottom,
  MotionRevealFromLeft,
  MotionRevealFromRight,
  MotionRevealFromTop,
} from "@/components/motion/reveal";
import { theme as antdTheme, Button } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HeroParent() {
  // React hooks
  const router = useRouter();

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  return (
    <section className="">
      <div className="w-full flex flex-col items-center justify-center gap-8">
        <div className="w-full flex flex-col items-center justify-center gap-6">
          <MotionRevealFromTop>
            <p
              style={{
                color: theme.colorPrimary,
              }}
              className="text-center font-bold md:text-left underline underline-offset-8"
            >
              Parents
            </p>
          </MotionRevealFromTop>
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MotionRevealFromLeft>
              <div
                style={{
                  backgroundColor: theme.colorBgContainer,
                  borderRadius: theme.borderRadius,
                }}
                className="w-full h-full grid grid-cols-2 gap-2 border hover:scale-[1.02] transition-all duration-150 ease-in-out p-6"
              >
                <div className="w-full flex flex-col justify-between gap-2">
                  <div className="w-full flex flex-col gap-2">
                    <h3
                      style={{
                        color: theme.colorPrimary,
                      }}
                      className="tracking-widest text-sm font-medium"
                    >
                      Always informed
                    </h3>
                    <h1 className="text-xl font-semibold">
                      Children, program and courses
                    </h1>
                    <ul className="list-disc ml-4">
                      <li>
                        Sign up to access your personalized parent dashboard
                      </li>
                      <li>
                        Easily select and link your children to your account
                      </li>
                      <li>View all their academic details in one place</li>
                      <li>
                        Stay informed about each child's unique progress and
                        activities
                      </li>
                    </ul>
                  </div>
                  <div>
                    <Button
                      size="large"
                      onClick={() => router.push("/help")}
                      className="w-auto"
                    >
                      Learn more
                    </Button>
                  </div>
                </div>
                <div
                  style={{
                    backgroundColor: theme.colorFillTertiary,
                    borderRadius: theme.borderRadius,
                  }}
                  className="w-full flex items-center justify-center p-4"
                >
                  <Image
                    style={{
                      borderRadius: theme.borderRadius,
                    }}
                    src={"/images/pages/home/parent-1.png"}
                    alt=""
                    width={500}
                    height={500}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            </MotionRevealFromLeft>
            <MotionRevealFromRight>
              <div
                style={{
                  backgroundColor: theme.colorBgContainer,
                  borderRadius: theme.borderRadius,
                }}
                className="w-full h-full grid grid-cols-2 gap-2 border hover:scale-[1.02] transition-all duration-150 ease-in-out p-6"
              >
                <div className="w-full flex flex-col justify-between gap-2">
                  <div className="w-full flex flex-col gap-2">
                    <h3
                      style={{
                        color: theme.colorPrimary,
                      }}
                      className="tracking-widest text-sm font-medium"
                    >
                      Success
                    </h3>
                    <h1 className="text-xl font-semibold">
                      Exams, quiz and results
                    </h1>
                    <ul className="list-disc ml-4">
                      <li>
                        Follow your child's exam and quiz schedules effortlessly
                      </li>
                      <li>
                        Instantly access their results and performance reports
                      </li>
                      <li>Get notified about missed exams or low scores</li>
                      <li>
                        Stay engaged with a seamless parent-teacher
                        communication system
                      </li>
                    </ul>
                  </div>
                  <div>
                    <Button
                      size="large"
                      onClick={() => router.push("/help")}
                      className="w-auto"
                    >
                      Learn more
                    </Button>
                  </div>
                </div>
                <div
                  style={{
                    backgroundColor: theme.colorFillTertiary,
                    borderRadius: theme.borderRadius,
                  }}
                  className="w-full flex items-center justify-center p-4"
                >
                  <Image
                    style={{
                      borderRadius: theme.borderRadius,
                    }}
                    src={"/images/pages/home/parent-2.jpg"}
                    alt=""
                    width={500}
                    height={500}
                    className="w-full object-contain object-center"
                  />
                </div>
              </div>
            </MotionRevealFromRight>
          </div>
        </div>
      </div>
    </section>
  );
}
