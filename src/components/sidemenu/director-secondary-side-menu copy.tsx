import React from "react";
import { ItemType } from "antd/es/menu/interface";

import HomeIcon from "@/components/icons/hugeicons/home";
import MegaphoneIcon from "@/components/icons/hugeicons/megaphone";
import CustomerSupportIcon from "@/components/icons/hugeicons/customer-support";
import SchoolIcon from "@/components/icons/hugeicons/school";
import ManagerIcon from "../icons/hugeicons/manager";

export default function getDirectorSecondarySideMenuItems(
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
      label: "Secondary school",
      type: "group",
      children: [
        {
          key: "/director/school-secondary/sections",
          icon: React.createElement(SchoolIcon),
          label: "Sections",
          style: { gap: 5 },
          onClick: onClick,
        },
        {
          key: "/director/school-secondary/classes",
          icon: React.createElement(ManagerIcon),
          label: "Classes",
          style: { gap: 5 },
          onClick: onClick,
        },
        {
          key: "/director/school-secondary/subjects",
          icon: React.createElement(ManagerIcon),
          label: "Subjects",
          style: { gap: 5 },
          onClick: onClick,
        },
        {
          key: "/director/school-secondary/pupils",
          icon: React.createElement(ManagerIcon),
          label: "Pupils",
          style: { gap: 5 },
          onClick: onClick,
        },
        {
          key: "/director/school-secondary/tests",
          icon: React.createElement(ManagerIcon),
          label: "Tests",
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
