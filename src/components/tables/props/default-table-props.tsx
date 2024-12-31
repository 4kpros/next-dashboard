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
  selectedRowKeys?: React.Key[];
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
  onRowSelectionSelected?: (
    record: T,
    selected: boolean,
    selectedRows: T[],
    nativeEvent: Event
  ) => void;
}): TableProps<T> {
  return {
    bordered: true,
    showHeader: true,
    showSorterTooltip: true,
    size: "middle",
    loading: props.isLoading ?? false,
    rowKey: "id",
    rowSelection: {
      type: "checkbox",
      preserveSelectedRowKeys: false,
      selectedRowKeys: props.selectedRowKeys,
      onChange: props.onRowSelectionChanged,
      onSelect: props.onRowSelectionSelected,
    },
    tableLayout: "auto",
    columns: props.columns,
    dataSource: props.data,
    onChange: (_pagination, filters, sorter) => {
      props.onFilterSortChanged!(filters, sorter);
    },
    pagination: false,
  };
}
