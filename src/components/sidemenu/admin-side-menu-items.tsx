import React from "react";
import { ItemType } from "antd/es/menu/interface";

import HomeIcon from "@/components/icons/hugeicons/home";
import ShieldIcon from "@/components/icons/hugeicons/shield";
import UserIcon from "@/components/icons/hugeicons/user";
import UserSwitchIcon from "@/components/icons/hugeicons/user-switch";
import MegaphoneIcon from "@/components/icons/hugeicons/megaphone";
import CustomerSupportIcon from "@/components/icons/hugeicons/customer-support";
import SchoolIcon from "@/components/icons/hugeicons/school";
import ClockHistoryIcon from "@/components/icons/hugeicons/clock-history";
import ManagerIcon from "../icons/hugeicons/manager";
import TeacherIcon from "../icons/hugeicons/teacher";
import StudentsIcon from "../icons/hugeicons/students";
import AssignmentsIcon from "../icons/hugeicons/assignments";

export default function getAdminSideMenuItems(
  onClick?: (info: { key: string }) => void
): ItemType[] {
  return [
    {
      key: "/admin/home",
      icon: React.createElement(HomeIcon),
      label: "Home",
      style: { gap: 5 },
      onClick: onClick,
    },
    {
      key: "grp-schools",
      label: "Schools",
      type: "group",
      children: [
        {
          key: "/admin/schools",
          icon: React.createElement(SchoolIcon),
          label: "Schools",
          style: { gap: 5 },
          onClick: onClick,
        },
        {
          key: "/admin/directors",
          icon: React.createElement(ManagerIcon),
          label: "Directors",
          style: { gap: 5 },
          onClick: onClick,
        },
        {
          key: "/admin/teachers",
          icon: React.createElement(TeacherIcon),
          label: "Teachers",
          style: { gap: 5 },
          onClick: onClick,
        },
        {
          key: "/admin/students",
          icon: React.createElement(StudentsIcon),
          label: "Students",
          style: { gap: 5 },
          onClick: onClick,
        },
        {
          key: "/admin/exams",
          icon: React.createElement(AssignmentsIcon),
          label: "Exams",
          style: { gap: 5 },
          onClick: onClick,
        },
      ],
    },
    {
      key: "grp-users-roles",
      label: "Users & roles",
      type: "group",
      children: [
        {
          key: "/admin/users",
          icon: React.createElement(UserIcon),
          label: "Users",
          style: { gap: 5 },
          onClick: onClick,
        },
        {
          key: "/admin/roles",
          icon: React.createElement(UserSwitchIcon),
          label: "Roles",
          style: { gap: 5 },
          onClick: onClick,
        },
        {
          key: "/admin/permissions",
          icon: React.createElement(ShieldIcon),
          label: "Permissions",
          style: { gap: 5 },
          onClick: onClick,
        },
      ],
    },
    {
      key: "grp-others",
      label: "Others",
      type: "group",
      children: [
        {
          key: "/admin/communication",
          icon: React.createElement(MegaphoneIcon),
          label: "Communication",
          style: { gap: 5 },
          onClick: onClick,
        },
        {
          key: "/admin/helpcenter",
          icon: React.createElement(CustomerSupportIcon),
          label: "Help center",
          style: { gap: 5 },
          onClick: onClick,
        },
        {
          key: "/admin/history",
          icon: React.createElement(ClockHistoryIcon),
          label: "History",
          style: { gap: 5 },
          onClick: onClick,
        },
      ],
    },
  ];
}
