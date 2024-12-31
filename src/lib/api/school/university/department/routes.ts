import { DELETE, GET, POST, PUT } from "@/lib/http/http";
import { GenericAbortSignal } from "axios";
import { DepartmentListResponse, DepartmentResponse } from "./response";
import { DepartmentListRequest, DepartmentRequest } from "./request";
import { SelectionRequest } from "@/lib/api/common/base-response";

// Department
export async function getDepartment(id: number) {
  return GET<DepartmentResponse, DepartmentRequest>(
    `/schools/schools/universities/departments/${id}`
  );
}
export async function getDepartmentList(
  params: DepartmentListRequest,
  signal?: GenericAbortSignal
) {
  return GET<DepartmentListResponse, DepartmentListRequest>(
    "/schools/universities/departments",
    {
      params: {
        schoolID: params.schoolID,
        search: params.search,
        orderBy: params.orderBy,
        sort: params.sort,
        page: params.page,
        limit: params.limit,
      },
      signal: signal,
    }
  );
}
export async function postDepartment(item: DepartmentRequest) {
  item.schoolID = parseInt(`${item.schoolID}`);
  item.facultyID = parseInt(`${item.facultyID}`);
  return POST<DepartmentResponse, DepartmentRequest>(
    `/schools/universities/departments`,
    item
  );
}
export async function updateDepartment(item: DepartmentRequest) {
  const id = item.id;
  item.id = undefined;
  item.schoolID = parseInt(`${item.schoolID}`);
  item.facultyID = parseInt(`${item.facultyID}`);
  return PUT<DepartmentResponse, DepartmentRequest>(
    `/schools/universities/departments/${id}`,
    item
  );
}
export async function deleteDepartment(id: number) {
  return DELETE<DepartmentResponse, DepartmentRequest>(
    `/schools/universities/departments/${id}`
  );
}
export async function deleteMultipleDepartment(selection: SelectionRequest) {
  return DELETE<number, SelectionRequest>(
    `/schools/universities/departments/multiple/delete`,
    {
      data: selection,
    }
  );
}
