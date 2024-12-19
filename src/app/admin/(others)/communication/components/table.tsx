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
import { CommunicationResponse } from "@/lib/api/communication/response";

export default function CommunicationsTable(props: {
  isLoading?: boolean;
  data?: CommunicationResponse[];
  orderBy?: string;
  sort?: SortOrder;
  selectedRowKeys?: React.Key[];
  onFilterSortChanged?: (
    filters: Record<string, FilterValue | null>,
    sorter:
      | SorterResult<CommunicationResponse>
      | SorterResult<CommunicationResponse>[]
  ) => void;
  onRowSelectionChanged?: (
    selectedRowKeys: React.Key[],
    selectedRows: CommunicationResponse[],
    info: {
      type: RowSelectMethod;
    }
  ) => void;
  onRowSelectionSelected?: (
    record: CommunicationResponse,
    selected: boolean,
    selectedRows: CommunicationResponse[],
    nativeEvent: Event
  ) => void;
  onDetailsRequested?: (value: CommunicationResponse, index: number) => void;
  onUpdateRequested?: (value: CommunicationResponse, index: number) => void;
  onDeleteConfirmed?: (value: CommunicationResponse, index: number) => void;
}) {
  // Table columns. dataIndex represents the field name(case sensitive) of the model(RecordType)
  const columns: TableColumnsType<CommunicationResponse> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id", // Useful for row selection
      sortOrder: props.orderBy && props.orderBy === "id" ? props.sort : null,
      ...defaultColumnProps,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sortOrder: props.orderBy && props.orderBy === "title" ? props.sort : null,
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
      title: "Audience type",
      dataIndex: "audienceType",
      key: "audience_type",
      sortOrder:
        props.orderBy && props.orderBy === "audience_type" ? props.sort : null,
      ...defaultColumnProps,
    },
    {
      title: "Audience value",
      dataIndex: "audienceValue",
      key: "audience_value",
      sortOrder:
        props.orderBy && props.orderBy === "audience_value" ? props.sort : null,
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
        deleteDescription: "this communication",
        onDetailsRequested: props.onDetailsRequested,
        onUpdateRequested: props.onUpdateRequested,
        onDeleteConfirmed: props.onDeleteConfirmed,
      }),
    },
  ];
  return (
    <div className="w-full mt-2">
      <Table<CommunicationResponse>
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
