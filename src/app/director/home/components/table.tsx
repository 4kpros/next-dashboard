"use client";

import { Table, TableColumnsType } from "antd";
import { User } from "@/types/user/response";
import DefaultTableProps from "@/components/tables/props/default-table-props";
import {
  defaultColumnActionProps,
  defaultColumnBooleanProps,
  defaultColumnProps,
} from "@/components/tables/props/default-column-props";
import {
  FilterValue,
  RowSelectMethod,
  SorterResult,
} from "antd/es/table/interface";

export default function UsersTable(props: {
  isLoading: boolean;
  data: User[];
  pageSize?: number;
  selectedRowKeys?: React.Key[];
  onPaginationChanged?: (page: number, pageSize: number) => void;
  onFilterSortChanged?: (
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<User> | SorterResult<User>[]
  ) => void;
  onRowSelectionChanged?: (
    selectedRowKeys: React.Key[],
    selectedRows: User[],
    info: {
      type: RowSelectMethod;
    }
  ) => void;
  onUpdateRequested?: (value: User, index: number) => void;
  onDeleteConfirmed?: (value: User, index: number) => void;
}) {
  // Table columns. dataIndex represents the field name(case sensitive) of the model(RecordType)
  const columns: TableColumnsType<User> = [
    {
      title: "ID",
      dataIndex: "ID",
      ...defaultColumnProps,
    },
    {
      title: "Email",
      dataIndex: "Email",
      ...defaultColumnProps,
    },
    {
      title: "Phone number",
      dataIndex: "PhoneNumber",
      ...defaultColumnProps,
    },
    {
      title: "Role ID",
      dataIndex: "RoleId",
      ...defaultColumnProps,
    },
    {
      title: "Is activated",
      dataIndex: "IsActivated",
      // Column props for booleans
      ...defaultColumnBooleanProps,
    },
    {
      // Column props for actions(update, delete, ...)
      ...defaultColumnActionProps({
        deleteDescription: "this user",
        onUpdateRequested: props.onUpdateRequested,
        onDeleteConfirmed: props.onDeleteConfirmed,
      }),
    },
  ];
  return (
    <div className="w-full mt-2">
      <Table<User>
        {...DefaultTableProps({
          isLoading: props.isLoading,
          data: props.data,
          columns: columns,
          pageSize: props.pageSize,
          selectedRowKeys: props.selectedRowKeys,
          onPaginationChanged: props.onPaginationChanged,
          onFilterSortChanged: props.onFilterSortChanged,
          onRowSelectionChanged: props.onRowSelectionChanged,
        })}
      />
    </div>
  );
}
