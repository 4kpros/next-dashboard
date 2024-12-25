import React from "react";
import { ItemType, MenuItemType } from "antd/es/menu/interface";

import HomeIcon from "@/components/icons/hugeicons/home";
import ShieldIcon from "@/components/icons/hugeicons/shield";
import UserIcon from "@/components/icons/hugeicons/user";
import UserSwitchIcon from "@/components/icons/hugeicons/user-switch";
import MegaphoneIcon from "@/components/icons/hugeicons/megaphone";
import CustomerSupportIcon from "@/components/icons/hugeicons/customer-support";
import SchoolIcon from "@/components/icons/hugeicons/school";
import ClockHistoryIcon from "@/components/icons/hugeicons/clock-history";
import ManagerIcon from "../../../components/icons/hugeicons/manager";
import UniversityIcon from "@/components/icons/hugeicons/university";
import FlagIcon from "@/components/icons/hugeicons/flag";
import CalendarIcon from "@/components/icons/hugeicons/calendar";

export default function sideMenuItems(
  onClick?: (info: { key: string }) => void
): ItemType<MenuItemType>[] {
  return [
    {
      key: "/admin/home",
      icon: <HomeIcon />,
      label: "Home",
      style: { gap: 5 },
      onClick: onClick,
    },
    {
      key: "grp-schools",
      label: "School",
      type: "group",
      children: [
        {
          key: "/admin/years",
          icon: <CalendarIcon />,
          label: "Years",
          style: { gap: 5 },
          onClick: onClick,
        },
        {
          key: "/admin/schools",
          icon: <FlagIcon />,
          label: "Schools",
          style: { gap: 5 },
          onClick: onClick,
        },
        {
          key: "/admin/directors",
          icon: <ManagerIcon />,
          label: "Directors",
          style: { gap: 5 },
          onClick: onClick,
        },
        {
          key: "grp-university",
          label: "University",
          icon: <UniversityIcon />,
          children: [
            {
              key: "/admin/university/faculties",
              label: "Faculties",
              style: { gap: 5 },
              onClick: onClick,
            },
            {
              key: "/admin/university/departments",
              label: "Departments",
              style: { gap: 5 },
              onClick: onClick,
            },
            {
              key: "/admin/university/domains",
              label: "Domains",
              style: { gap: 5 },
              onClick: onClick,
            },
            {
              key: "/admin/university/levels",
              label: "Levels",
              style: { gap: 5 },
              onClick: onClick,
            },
            {
              key: "/admin/university/tu",
              label: "Teaching units",
              style: { gap: 5 },
              onClick: onClick,
            },
            {
              key: "/admin/university/students",
              label: "Students",
              style: { gap: 5 },
              onClick: onClick,
            },
          ],
        },
        {
          key: "grp-highschool",
          label: "Highschool",
          icon: <SchoolIcon />,
          children: [
            {
              key: "/admin/highschool/sections",
              label: "Sections",
              style: { gap: 5 },
              onClick: onClick,
            },
            {
              key: "/admin/highschool/classes",
              label: "Classes",
              style: { gap: 5 },
              onClick: onClick,
            },
            {
              key: "/admin/highschool/courses",
              label: "Courses",
              style: { gap: 5 },
              onClick: onClick,
            },
          ],
        },
      ],
    },
    {
      key: "grp-users-roles",
      label: "Users & roles",
      type: "group",
      children: [
        {
          key: "/admin/roles",
          icon: <UserSwitchIcon />,
          label: "Roles",
          style: { gap: 5 },
          onClick: onClick,
        },
        {
          key: "/admin/permissions",
          icon: <ShieldIcon />,
          label: "Permissions",
          style: { gap: 5 },
          onClick: onClick,
        },
        {
          key: "/admin/users",
          icon: <UserIcon />,
          label: "Users",
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
          icon: <MegaphoneIcon />,
          label: "Communication",
          style: { gap: 5 },
          onClick: onClick,
        },
        {
          key: "/admin/contact",
          icon: <CustomerSupportIcon />,
          label: "Help center",
          style: { gap: 5 },
          onClick: onClick,
        },
        {
          key: "/admin/history",
          icon: <ClockHistoryIcon />,
          label: "History",
          style: { gap: 5 },
          onClick: onClick,
        },
      ],
    },
  ];
}
