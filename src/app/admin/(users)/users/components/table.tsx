import { Table, TableColumnsType, Tooltip } from "antd";
import DefaultTableProps from "@/components/tables/props/default-table-props";
import {
  defaultColumnActionProps,
  defaultColumnBooleanProps,
  defaultColumnBooleanPropsWithoutSorter,
  defaultColumnDateTimeProps,
  defaultColumnProps,
  defaultColumnPropsWithoutSorter,
} from "@/components/tables/props/default-column-props";
import {
  FilterValue,
  RowSelectMethod,
  SorterResult,
  SortOrder,
} from "antd/es/table/interface";
import { UserResponse } from "@/lib/api/user/response";
import { RoleResponse } from "@/lib/api/role/response";

export default function UsersTable(props: {
  isLoading?: boolean;
  data?: UserResponse[];
  orderBy?: string;
  sort?: SortOrder;
  selectedRowKeys?: React.Key[];
  onFilterSortChanged?: (
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<UserResponse> | SorterResult<UserResponse>[]
  ) => void;
  onRowSelectionChanged?: (
    selectedRowKeys: React.Key[],
    selectedRows: UserResponse[],
    info: {
      type: RowSelectMethod;
    }
  ) => void;
  onRowSelectionSelected?: (
    record: UserResponse,
    selected: boolean,
    selectedRows: UserResponse[],
    nativeEvent: Event
  ) => void;
  onDetailsRequested?: (value: UserResponse, index: number) => void;
  onUpdateRequested?: (value: UserResponse, index: number) => void;
  onDeleteConfirmed?: (value: UserResponse, index: number) => void;
}) {
  // Table columns. dataIndex represents the field name(case sensitive) of the model(RecordType)
  const columns: TableColumnsType<UserResponse> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      ...defaultColumnProps,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sortOrder: props.orderBy && props.orderBy === "email" ? props.sort : null,
      ...defaultColumnProps,
    },
    {
      title: "Phone number",
      dataIndex: "phoneNumber",
      key: "phone_number",
      sortOrder:
        props.orderBy && props.orderBy === "phone_number" ? props.sort : null,
      ...defaultColumnProps,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
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
      title: "Login method",
      dataIndex: "loginMethod",
      key: "login_method",
      ...defaultColumnPropsWithoutSorter,
    },
    {
      title: "Provider",
      dataIndex: "provider",
      key: "provider",
      ...defaultColumnPropsWithoutSorter,
    },
    {
      title: "Is activated",
      dataIndex: "isActivated",
      key: "is_activated",
      ...defaultColumnBooleanPropsWithoutSorter,
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
        deleteDescription: "this user",
        onDetailsRequested: props.onDetailsRequested,
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
          onRowSelectionChanged: props.onRowSelectionChanged,
          onRowSelectionSelected: props.onRowSelectionSelected,
        })}
      />
    </div>
  );
}
