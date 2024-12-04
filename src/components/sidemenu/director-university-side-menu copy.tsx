import React from "react";
import { ItemType } from "antd/es/menu/interface";

import HomeIcon from "@/components/icons/hugeicons/home";
import MegaphoneIcon from "@/components/icons/hugeicons/megaphone";
import CustomerSupportIcon from "@/components/icons/hugeicons/customer-support";
import SchoolIcon from "@/components/icons/hugeicons/school";
import ManagerIcon from "../icons/hugeicons/manager";

export default function getDirectorUniversitySideMenuItems(
  onClick?: (info: { key: string }) => void
): ItemType[] {
  return [
    {
      key: "/director/home",
      icon: React.createElement(HomeIcon),
      label: "Home",
      style: { gap: 5 },
      onClick: onClick,
    },
    {
      key: "grp-schools",
      label: "University school",
      type: "group",
      children: [
        {
          key: "/director/school-university/faculties",
          icon: React.createElement(SchoolIcon),
          label: "Faculties",
          style: { gap: 5 },
          onClick: onClick,
        },
        {
          key: "/director/school-university/departments",
          icon: React.createElement(ManagerIcon),
          label: "Departments",
          style: { gap: 5 },
          onClick: onClick,
        },
        {
          key: "/director/school-university/domains",
          icon: React.createElement(ManagerIcon),
          label: "Domains",
          style: { gap: 5 },
          onClick: onClick,
        },
        {
          key: "/director/school-university/levels",
          icon: React.createElement(ManagerIcon),
          label: "Levels",
          style: { gap: 5 },
          onClick: onClick,
        },
        {
          key: "/director/school-university/students",
          icon: React.createElement(ManagerIcon),
          label: "Students",
          style: { gap: 5 },
          onClick: onClick,
        },
        {
          key: "/director/school-university/teaching-units",
          icon: React.createElement(ManagerIcon),
          label: "Teaching units",
          style: { gap: 5 },
          onClick: onClick,
        },
        {
          key: "/director/school-university/exams",
          icon: React.createElement(ManagerIcon),
          label: "Exams",
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
          key: "/director/communication",
          icon: React.createElement(MegaphoneIcon),
          label: "Communication",
          style: { gap: 5 },
          onClick: onClick,
        },
        {
          key: "/director/helpcenter",
          icon: React.createElement(CustomerSupportIcon),
          label: "Help center",
          style: { gap: 5 },
          onClick: onClick,
        },
      ],
    },
  ];
}
