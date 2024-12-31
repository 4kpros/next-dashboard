export const ROUTE_API_BASE_URL_INTERNAL = "/backend-api";

export const ROUTE_INVALID_FEATURE_PERMISSION = "/auth/invalidpermissions";

// Feature protected
export const ROUTE_PROTECTED_ADMIN = ["/admin"];
export const ROUTE_PROTECTED_DIRECTOR = ["/director"];
export const ROUTE_PROTECTED_TEACHER = ["/teacher"];
export const ROUTE_PROTECTED_STUDENT = ["/student"];
export const ROUTE_PROTECTED_PARENT = ["/parent"];
// Default protected
export const ROUTE_PROTECTED_DEFAULT = ["/profile"];

// All protected
export const ROUTE_PROTECTED_LIST = ROUTE_PROTECTED_ADMIN.concat(
  ROUTE_PROTECTED_DIRECTOR
)
  .concat(ROUTE_PROTECTED_TEACHER)
  .concat(ROUTE_PROTECTED_STUDENT)
  .concat(ROUTE_PROTECTED_PARENT)
  .concat(ROUTE_PROTECTED_DEFAULT);
