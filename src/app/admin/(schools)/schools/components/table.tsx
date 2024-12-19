import { Table, TableColumnsType } from "antd";
import DefaultTableProps from "@/components/tables/props/default-table-props";
import {
  defaultColumnActionProps,
  defaultColumnDateTimeProps,
  defaultColumnProps,
} from "@/components/tables/props/default-column-props";
import {
  FilterValue,
  RowSelectMethod,
  SorterResult,
  SortOrder,
} from "antd/es/table/interface";
import { SchoolResponse } from "@/lib/api/school/response";

export default function SchoolsTable(props: {
  isLoading?: boolean;
  data?: SchoolResponse[];
  orderBy?: string;
  sort?: SortOrder;
  selectedRowKeys?: React.Key[];
  onFilterSortChanged?: (
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<SchoolResponse> | SorterResult<SchoolResponse>[]
  ) => void;
  onRowSelectionChanged?: (
    selectedRowKeys: React.Key[],
    selectedRows: SchoolResponse[],
    info: {
      type: RowSelectMethod;
    }
  ) => void;
  onRowSelectionSelected?: (
    record: SchoolResponse,
    selected: boolean,
    selectedRows: SchoolResponse[],
    nativeEvent: Event
  ) => void;
  onDetailsRequested?: (value: SchoolResponse, index: number) => void;
  onUpdateRequested?: (value: SchoolResponse, index: number) => void;
  onDeleteConfirmed?: (value: SchoolResponse, index: number) => void;
}) {
  // Table columns. dataIndex represents the field name(case sensitive) of the model(RecordType)
  const columns: TableColumnsType<SchoolResponse> = [
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
      title: "Type",
      dataIndex: "type",
      key: "type",
      sortOrder: props.orderBy && props.orderBy === "type" ? props.sort : null,
      ...defaultColumnProps,
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
        deleteDescription: "this school",
        onDetailsRequested: props.onDetailsRequested,
        onUpdateRequested: props.onUpdateRequested,
        onDeleteConfirmed: props.onDeleteConfirmed,
      }),
    },
  ];
  return (
    <div className="w-full mt-2">
      <Table<SchoolResponse>
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
