import { Table, TableColumnsType } from "antd";
import DefaultTableProps from "@/components/table/props/default-table-props";
import {
  defaultColumnActionProps,
  defaultColumnDateTimeProps,
  defaultColumnProps,
} from "@/components/table/props/default-column-props";
import {
  FilterValue,
  RowSelectMethod,
  SorterResult,
  SortOrder,
} from "antd/es/table/interface";
import TableColumnSchool from "@/components/table/columns/column-school";
import { DepartmentResponse } from "@/lib/api/school/university/department/response";
import TableColumnFaculty from "@/components/table/columns/column-faculty";

export default function DepartmentsTable(props: {
  isLoading?: boolean;
  data?: DepartmentResponse[];
  orderBy?: string;
  sort?: SortOrder;
  selectedRowKeys?: React.Key[];
  onFilterSortChanged?: (
    filters: Record<string, FilterValue | null>,
    sorter:
      | SorterResult<DepartmentResponse>
      | SorterResult<DepartmentResponse>[]
  ) => void;
  onRowSelectionChanged?: (
    selectedRowKeys: React.Key[],
    selectedRows: DepartmentResponse[],
    info: {
      type: RowSelectMethod;
    }
  ) => void;
  onRowSelectionSelected?: (
    record: DepartmentResponse,
    selected: boolean,
    selectedRows: DepartmentResponse[],
    nativeEvent: Event
  ) => void;
  onDetailsRequested?: (value: DepartmentResponse, index: number) => void;
  onUpdateRequested?: (value: DepartmentResponse, index: number) => void;
  onDeleteConfirmed?: (value: DepartmentResponse, index: number) => void;
}) {
  // Table columns. dataIndex represents the field name(case sensitive) of the model(RecordType)
  const columns: TableColumnsType<DepartmentResponse> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id", // Useful for row selection
      sortOrder: props.orderBy && props.orderBy === "id" ? props.sort : null,
      ...defaultColumnProps,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sortOrder: props.orderBy && props.orderBy === "name" ? props.sort : null,
      ...defaultColumnProps,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      sortOrder:
        props.orderBy && props.orderBy === "description" ? props.sort : null,
      ...defaultColumnProps,
    },
    {
      title: "School",
      dataIndex: "school",
      key: "school",
      sorter: false,
      ellipsis: {
        showTitle: false,
      },
      render: (_, record) => <TableColumnSchool record={record.school} />,
    },
    {
      title: "Faculty",
      dataIndex: "faculty",
      key: "faculty",
      sorter: false,
      ellipsis: {
        showTitle: false,
      },
      render: (_, record) => <TableColumnFaculty record={record.faculty} />,
    },
    {
      title: "Updated",
      dataIndex: "updatedAt",
      key: "updated_at",
      sortOrder:
        props.orderBy && props.orderBy === "updated_at" ? props.sort : null,
      ...defaultColumnDateTimeProps,
    },
    {
      // Column props for actions(update, delete, ...)
      ...defaultColumnActionProps({
        deleteDescription: "this department",
        onDetailsRequested: props.onDetailsRequested,
        onUpdateRequested: props.onUpdateRequested,
        onDeleteConfirmed: props.onDeleteConfirmed,
      }),
    },
  ];
  return (
    <div className="w-full mt-2">
      <Table<DepartmentResponse>
        {...DefaultTableProps({
          isLoading: props.isLoading,
          data: props.data,
          columns: columns,
          selectedRowKeys: props.selectedRowKeys,
          onFilterSortChanged: props.onFilterSortChanged,
          onRowSelectionChanged: props.onRowSelectionChanged,
          onRowSelectionSelected: props.onRowSelectionSelected,
        })}
      />
    </div>
  );
}
