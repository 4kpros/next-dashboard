import { TableProps } from "antd";
import { ColumnsType } from "../table.type";
import {
  FilterValue,
  RowSelectMethod,
  SorterResult,
} from "antd/es/table/interface";

export default function DefaultTableProps<T extends object>(props: {
  isLoading?: boolean;
  data?: T[];
  columns?: ColumnsType<T>;
  pageSize?: number;
  selectedRowKeys?: React.Key[];
  onPaginationChanged?: (page: number, pageSize: number) => void;
  onFilterSortChanged?: (
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<T> | SorterResult<T>[]
  ) => void;
  onRowSelectionChanged?: (
    selectedRowKeys: React.Key[],
    selectedRows: T[],
    info: {
      type: RowSelectMethod;
    }
  ) => void;
}): TableProps<T> {
  // const ellipsis = true
  // const tableColumns = props.columns?.map((item) => ({ ...item, ellipsis }));
  return {
    bordered: false,
    showHeader: true,
    showSorterTooltip: true,
    size: "middle",
    loading: props.isLoading ?? false,
    rowSelection: {
      type: "checkbox",
      preserveSelectedRowKeys: false,
      selectedRowKeys: props.selectedRowKeys,
      onChange: props.onRowSelectionChanged,
    },
    tableLayout: "auto",
    columns: props.columns,
    dataSource: props.data,
    onChange: (_pagination, filters, sorter) => {
      props.onFilterSortChanged!(filters, sorter);
    },
    pagination: {
      position: ["none", "bottomRight"], // Top, bottom
      defaultPageSize: props.pageSize,
      pageSize: props.pageSize,
      onChange: props.onPaginationChanged,
    },
  };
}
