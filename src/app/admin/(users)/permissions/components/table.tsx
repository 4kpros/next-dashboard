import { Table, TableColumnsType, Tooltip } from "antd";
import DefaultTableProps from "@/components/tables/props/default-table-props";
import {
  defaultColumnActionProps,
  defaultColumnBooleanPropsWithoutSorter,
  defaultColumnDateTimeProps,
  defaultColumnProps,
} from "@/components/tables/props/default-column-props";
import {
  FilterValue,
  RowSelectMethod,
  SorterResult,
  SortOrder,
} from "antd/es/table/interface";
import { PermissionResponse } from "@/lib/api/permission/response";
import { RoleResponse } from "@/lib/api/role/response";

export default function PermissionsTable(props: {
  isLoading?: boolean;
  data?: PermissionResponse[];
  orderBy?: string;
  sort?: SortOrder;
  selectedRowKeys?: React.Key[];
  onFilterSortChanged?: (
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<PermissionResponse> | SorterResult<PermissionResponse>[]
  ) => void;
  onRowSelectionChanged?: (
    selectedRowKeys: React.Key[],
    selectedRows: PermissionResponse[],
    info: {
      type: RowSelectMethod;
    }
  ) => void;
  onRowSelectionSelected?: (
    record: PermissionResponse,
    selected: boolean,
    selectedRows: PermissionResponse[],
    nativeEvent: Event
  ) => void;
  onDetailsRequested?: (value: PermissionResponse, index: number) => void;
  onUpdateRequested?: (value: PermissionResponse, index: number) => void;
  onDeleteConfirmed?: (value: PermissionResponse, index: number) => void;
}) {
  // Table columns. dataIndex represents the field name(case sensitive) of the model(RecordType)
  const columns: TableColumnsType<PermissionResponse> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id", // Useful for row selection
      sortOrder: props.orderBy && props.orderBy === "id" ? props.sort : null,
      ...defaultColumnProps,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role_id",
      sorter: false,
      ellipsis: {
        showTitle: false,
      },
      render: (item?: RoleResponse) => (
        <Tooltip placement="topLeft" title={item?.name}>
          {item?.name}
        </Tooltip>
      ),
    },
    {
      title: "Table name",
      dataIndex: "tableName",
      key: "table_name",
      sortOrder: props.orderBy && props.orderBy === "table_name" ? props.sort : null,
      ...defaultColumnProps,
    },
    {
      title: "Create",
      dataIndex: "create",
      key: "create",
      ...defaultColumnBooleanPropsWithoutSorter,
    },
    {
      title: "Read",
      dataIndex: "read",
      key: "read",
      ...defaultColumnBooleanPropsWithoutSorter,
    },
    {
      title: "Update",
      dataIndex: "update",
      key: "update",
      ...defaultColumnBooleanPropsWithoutSorter,
    },
    {
      title: "Delete",
      dataIndex: "delete",
      key: "delete",
      ...defaultColumnBooleanPropsWithoutSorter,
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
        deleteDescription: "this permission",
        onDetailsRequested: props.onDetailsRequested,
        onUpdateRequested: props.onUpdateRequested,
        onDeleteConfirmed: props.onDeleteConfirmed,
      }),
    },
  ];
  return (
    <div className="w-full mt-2">
      <Table<PermissionResponse>
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
