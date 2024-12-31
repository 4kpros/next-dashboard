import { Table, TableColumnsType } from "antd";
import DefaultTableProps from "@/components/table/props/default-table-props";
import {
  defaultColumnDateTimeProps,
  defaultColumnProps,
} from "@/components/table/props/default-column-props";
import {
  FilterValue,
  RowSelectMethod,
  SorterResult,
  SortOrder,
} from "antd/es/table/interface";
import { HistoryResponse } from "@/lib/api/others/history/response";

export default function HistoriesTable(props: {
  isLoading?: boolean;
  data?: HistoryResponse[];
  orderBy?: string;
  sort?: SortOrder;
  selectedRowKeys?: React.Key[];
  onFilterSortChanged?: (
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<HistoryResponse> | SorterResult<HistoryResponse>[]
  ) => void;
  onRowSelectionChanged?: (
    selectedRowKeys: React.Key[],
    selectedRows: HistoryResponse[],
    info: {
      type: RowSelectMethod;
    }
  ) => void;
  onRowSelectionSelected?: (
    record: HistoryResponse,
    selected: boolean,
    selectedRows: HistoryResponse[],
    nativeEvent: Event
  ) => void;
  onDetailsRequested?: (value: HistoryResponse, index: number) => void;
  onUpdateRequested?: (value: HistoryResponse, index: number) => void;
  onDeleteConfirmed?: (value: HistoryResponse, index: number) => void;
}) {
  // Table columns. dataIndex represents the field name(case sensitive) of the model(RecordType)
  const columns: TableColumnsType<HistoryResponse> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id", // Useful for row selection
      sortOrder: props.orderBy && props.orderBy === "id" ? props.sort : null,
      ...defaultColumnProps,
    },
    {
      title: "User ID",
      dataIndex: "userID",
      key: "user_id",
      sortOrder:
        props.orderBy && props.orderBy === "user_id" ? props.sort : null,
      ...defaultColumnProps,
    },
    {
      title: "Table",
      dataIndex: "table",
      key: "table",
      sortOrder: props.orderBy && props.orderBy === "table" ? props.sort : null,
      ...defaultColumnProps,
    },
    {
      title: "Table row ID",
      dataIndex: "tableRowID",
      key: "table_row_id",
      sortOrder:
        props.orderBy && props.orderBy === "table_row_id" ? props.sort : null,
      ...defaultColumnProps,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      sortOrder:
        props.orderBy && props.orderBy === "action" ? props.sort : null,
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
  ];
  return (
    <div className="w-full mt-2">
      <Table<HistoryResponse>
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
