import {
  FEATURE_ADMIN,
  FEATURE_DIRECTOR,
  FEATURE_PARENT,
  FEATURE_STUDENT,
  FEATURE_TEACHER,
} from "@/lib/constants/feature";

export const getDashboardPath = (feature: string) => {
  switch (feature) {
    case FEATURE_ADMIN:
      return "/admin/home";
    case FEATURE_DIRECTOR:
      return "/director/home";
    case FEATURE_TEACHER:
      return "/teacher/home";
    case FEATURE_STUDENT:
      return "/student/home";
    case FEATURE_PARENT:
      return "/parent/home";

    default:
      return "/common/unknown";
  }
};
