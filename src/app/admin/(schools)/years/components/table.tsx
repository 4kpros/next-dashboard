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
import { YearResponse } from "@/lib/api/year/response";

export default function YearsTable(props: {
  isLoading?: boolean;
  data?: YearResponse[];
  orderBy?: string;
  sort?: SortOrder;
  selectedRowKeys?: React.Key[];
  onFilterSortChanged?: (
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<YearResponse> | SorterResult<YearResponse>[]
  ) => void;
  onRowSelectionChanged?: (
    selectedRowKeys: React.Key[],
    selectedRows: YearResponse[],
    info: {
      type: RowSelectMethod;
    }
  ) => void;
  onRowSelectionSelected?: (
    record: YearResponse,
    selected: boolean,
    selectedRows: YearResponse[],
    nativeEvent: Event
  ) => void;
  onDetailsRequested?: (value: YearResponse, index: number) => void;
  onUpdateRequested?: (value: YearResponse, index: number) => void;
  onDeleteConfirmed?: (value: YearResponse, index: number) => void;
}) {
  // Table columns. dataIndex represents the field name(case sensitive) of the model(RecordType)
  const columns: TableColumnsType<YearResponse> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id", // Useful for row selection
      sortOrder: props.orderBy && props.orderBy === "id" ? props.sort : null,
      ...defaultColumnProps,
    },
    {
      title: "Start date",
      dataIndex: "startDate",
      key: "start_date",
      sortOrder: props.orderBy && props.orderBy === "start_date" ? props.sort : null,
      ...defaultColumnProps,
    },
    {
      title: "End date",
      dataIndex: "endDate",
      key: "end_date",
      sortOrder: props.orderBy && props.orderBy === "end_date" ? props.sort : null,
      ...defaultColumnProps,
    },
    {
      title: "Updated",
      dataIndex: "updatedAt",
      key: "updated_at",
      sortOrder: props.orderBy && props.orderBy === "updated_at" ? props.sort : null,
      ...defaultColumnDateTimeProps,
    },
    {
      // Column props for actions(update, delete, ...)
      ...defaultColumnActionProps({
        deleteDescription: "this year",
        onDetailsRequested: props.onDetailsRequested,
        onUpdateRequested: props.onUpdateRequested,
        onDeleteConfirmed: props.onDeleteConfirmed,
      }),
    },
  ];
  return (
    <div className="w-full mt-2">
      <Table<YearResponse>
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
