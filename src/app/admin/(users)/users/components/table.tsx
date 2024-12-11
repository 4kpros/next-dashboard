"use client";

import { Table, TableColumnsType } from "antd";
import DefaultTableProps from "@/components/tables/props/default-table-props";
import {
  defaultColumnActionProps,
  defaultColumnBooleanProps,
  defaultColumnProps,
} from "@/components/tables/props/default-column-props";
import { FilterValue, RowSelectMethod, SorterResult } from "antd/es/table/interface";
import { UserResponse } from "@/lib/api/user/response";

export default function UsersTable(props: {
  isLoading: boolean;
  data: UserResponse[];
  pageSize?: number;
  selectedRowKeys?: React.Key[],
  onPaginationChanged?: (page: number, pageSize: number) => void;
  onFilterSortChanged?: (
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<UserResponse> | SorterResult<UserResponse>[]
  ) => void;
  onRowSelectionChanged?: (selectedRowKeys: React.Key[], selectedRows: UserResponse[], info: {
    type: RowSelectMethod;
  }) => void
  onUpdateRequested?: (value: UserResponse, index: number) => void;
  onDeleteConfirmed?: (value: UserResponse, index: number) => void;
}) {
  // Table columns. dataIndex represents the field name(case sensitive) of the model(RecordType)
  const columns: TableColumnsType<UserResponse> = [
    {
      title: "ID",
      dataIndex: "id",
      ...defaultColumnProps,
    },
    {
      title: "Email",
      dataIndex: "email",
      ...defaultColumnProps,
    },
    {
      title: "Phone number",
      dataIndex: "phoneNumber",
      ...defaultColumnProps,
    },
    {
      title: "Role ID",
      dataIndex: "roleID",
      ...defaultColumnProps,
    },
    {
      title: "Is activated",
      dataIndex: "isActivated",
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
      <Table<UserResponse>
        {...DefaultTableProps({
          isLoading: props.isLoading,
          data: props.data,
          columns: columns,
          selectedRowKeys: props.selectedRowKeys,
          onFilterSortChanged: props.onFilterSortChanged,
          onRowSelectionChanged: props.onRowSelectionChanged
        })}
      />
    </div>
  );
}
