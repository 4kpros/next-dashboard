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
import TableColumnSpecialty from "@/components/table/columns/column-specialty";
import { ClassResponse } from "@/lib/api/school/highschool/class/response";

export default function ClassesTable(props: {
  isLoading?: boolean;
  data?: ClassResponse[];
  orderBy?: string;
  sort?: SortOrder;
  selectedRowKeys?: React.Key[];
  onFilterSortChanged?: (
    filters: Record<string, FilterValue | null>,
    sorter:
      | SorterResult<ClassResponse>
      | SorterResult<ClassResponse>[]
  ) => void;
  onRowSelectionChanged?: (
    selectedRowKeys: React.Key[],
    selectedRows: ClassResponse[],
    info: {
      type: RowSelectMethod;
    }
  ) => void;
  onRowSelectionSelected?: (
    record: ClassResponse,
    selected: boolean,
    selectedRows: ClassResponse[],
    nativeEvent: Event
  ) => void;
  onDetailsRequested?: (value: ClassResponse, index: number) => void;
  onUpdateRequested?: (value: ClassResponse, index: number) => void;
  onDeleteConfirmed?: (value: ClassResponse, index: number) => void;
}) {
  // Table columns. dataIndex represents the field name(case sensitive) of the model(RecordType)
  const columns: TableColumnsType<ClassResponse> = [
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
      title: "Specialty",
      dataIndex: "specialty",
      key: "specialty",
      sorter: false,
      ellipsis: {
        showTitle: false,
      },
      render: (_, record) => <TableColumnSpecialty record={record.specialty} />,
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
        deleteDescription: "this class",
        onDetailsRequested: props.onDetailsRequested,
        onUpdateRequested: props.onUpdateRequested,
        onDeleteConfirmed: props.onDeleteConfirmed,
      }),
    },
  ];
  return (
    <div className="w-full mt-2">
      <Table<ClassResponse>
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
