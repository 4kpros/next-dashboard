import { Table, TableColumnsType } from "antd";
import DefaultTableProps from "@/components/tables/props/default-table-props";
import {
  defaultColumnDateTimeProps,
  defaultColumnProps,
} from "@/components/tables/props/default-column-props";
import {
  FilterValue,
  RowSelectMethod,
  SorterResult,
  SortOrder,
} from "antd/es/table/interface";
import { ContactResponse } from "@/lib/api/contact/response";

export default function ContactsTable(props: {
  isLoading?: boolean;
  data?: ContactResponse[];
  orderBy?: string;
  sort?: SortOrder;
  selectedRowKeys?: React.Key[];
  onFilterSortChanged?: (
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<ContactResponse> | SorterResult<ContactResponse>[]
  ) => void;
  onRowSelectionChanged?: (
    selectedRowKeys: React.Key[],
    selectedRows: ContactResponse[],
    info: {
      type: RowSelectMethod;
    }
  ) => void;
  onRowSelectionSelected?: (
    record: ContactResponse,
    selected: boolean,
    selectedRows: ContactResponse[],
    nativeEvent: Event
  ) => void;
  onDetailsRequested?: (value: ContactResponse, index: number) => void;
  onUpdateRequested?: (value: ContactResponse, index: number) => void;
  onDeleteConfirmed?: (value: ContactResponse, index: number) => void;
}) {
  // Table columns. dataIndex represents the field name(case sensitive) of the model(RecordType)
  const columns: TableColumnsType<ContactResponse> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id", // Useful for row selection
      sortOrder: props.orderBy && props.orderBy === "id" ? props.sort : null,
      ...defaultColumnProps,
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      sortOrder:
        props.orderBy && props.orderBy === "subject" ? props.sort : null,
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
      title: "Message",
      dataIndex: "message",
      key: "message",
      sortOrder:
        props.orderBy && props.orderBy === "message" ? props.sort : null,
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
      <Table<ContactResponse>
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
