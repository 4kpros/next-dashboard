"use client";

import { theme as antdTheme, Collapse, CollapseProps } from "antd";
import { useRouter } from "next/navigation";

export default function SegmentFAQ() {
  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  // React hooks
  const router = useRouter();

  return (
    <div className="w-full mt-6">
      <div className="w-full min-h-[600px] flex flex-col items-center gap-12">
        <h1 className="w-full max-w-screen-sm text-center text-4xl font-semibold">
          Find answers to the most common questions about our platform
        </h1>
        <Collapse accordion items={items} size="large" className="w-full" />
      </div>
    </div>
  );
}

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const items: CollapseProps["items"] = [
  {
    key: "1",
    label: "How do I follow my academic program as a student?",
    children: (
      <p>
        Access your program details in the "Programs" section. Stay informed
        about courses, schedules, and academic milestones. Monitor your progress
        through assignments, grades, and feedback.
      </p>
    ),
  },
  {
    key: "2",
    label: "How do I follow my courses as a student?",
    children: (
      <p>
        Log in to your student account and navigate to the "Courses" section.
        Access course schedules, materials, and updates in real-time. Track
        assignments, deadlines, and your academic progress.
      </p>
    ),
  },
  {
    key: "3",
    label: "How can I register as a parent?",
    children: (
      <p>
        Access the "Exams & Results" section from your dashboard. View your
        child's scores and feedback as soon as results are posted. Receive
        notifications whenever new exam results are available.
      </p>
    ),
  },
  {
    key: "4",
    label: "How can I track my child's exam results?",
    children: (
      <p>
        Sign up by providing your details and linking your child's profile.
        Complete the registration process through the email verification link.
        After registration, you will have access to your child's academic
        updates.
      </p>
    ),
  },
  {
    key: "5",
    label: "How do I join a meeting or forum?",
    children: (
      <p>
        Go to the "Meetings & Forums" section from your dashboard. View upcoming
        meetings and click on the links to join. Participate in forum
        discussions and stay updated on academic events.
      </p>
    ),
  },
  {
    key: "6",
    label: "How can I get support for technical issues?",
    children: (
      <p>
        Visit the "Support" section from your dashboard. Browse through the FAQ
        for solutions or submit a ticket. Our support team will respond to your
        inquiry within 24 hours.
      </p>
    ),
  },
  {
    key: "7",
    label: "How do I communicate with my child's teachers?",
    children: (
      <p>
        Use the "Messaging" feature to send and receive messages. Stay connected
        with teachers for updates or questions regarding your child. Check for
        replies and notifications in your parent dashboard.
      </p>
    ),
  },
];
