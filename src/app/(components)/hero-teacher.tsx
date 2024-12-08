import { theme as antdTheme } from "antd";
import HeroTeacherCard, { HeroTeacherCardType } from "./hero-teacher-card";
import {
  MotionRevealFromBottom,
  MotionRevealFromLeft,
  MotionRevealFromRight,
} from "@/components/motion/reveal";

export default function HeroTeacher() {
  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  return (
    <section>
      <div className="w-full flex flex-col items-center justify-center gap-8">
        <div className="w-full flex flex-wrap xl:flex-nowrap justify-between gap-4">
          <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
            <MotionRevealFromLeft>
              <h1
                style={{
                  color: theme.colorPrimary,
                }}
                className="sm:text-3xl text-2xl font-medium title-font mb-2 underline underline-offset-8"
              >
                Teachers
              </h1>
            </MotionRevealFromLeft>
          </div>
          <div className="w-full lg:w-1/2">
            <MotionRevealFromRight>
              <p className="opacity-75">
                Teachers can easily log in to the platform to access a wide
                range of tools designed to enhance their classroom management
                and interaction with students. Once logged in, they can view
                their class schedules, track attendance, and monitor student
                performance through detailed reports.
              </p>
            </MotionRevealFromRight>
          </div>
        </div>
        <MotionRevealFromBottom>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
            {items.map((item, index) => (
              <HeroTeacherCard item={item} key={index} />
            ))}
          </div>
        </MotionRevealFromBottom>
      </div>
    </section>
  );
}

const items: HeroTeacherCardType[] = [
  {
    image: "/images/pages/home/teacher-student.jpg",
    title: "Students/Pupils",
    subtitle:
      "Our student management system simplifies administrative tasks and provides valuable insights into student performance.",
  },
  {
    image: "/images/pages/home/teacher-course.jpg",
    title: "Courses",
    subtitle:
      "Simplifies the process of creating, managing, and tracking courses.",
  },
  {
    image: "/images/pages/home/teacher-meet.jpg",
    title: "Meetings & forum",
    subtitle:
      "Centralized platform for organizing and facilitating meetings and discussions within your school community. ",
  },
  {
    image: "/images/pages/home/teacher-exam.jpg",
    title: "Exams & quizzes",
    subtitle: "Helps to make exams and quizzes more engaging for students.",
  },
];
