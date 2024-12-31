import { Table, TableColumnsType } from "antd";
import DefaultTableProps from "@/components/table/props/default-table-props";
import {
  defaultColumnActionProps,
  defaultColumnDateTimeProps,
  defaultColumnProps,
} from "@/components/table/props/default-column-props";
import {
  FilterValue,
  RowSelectMethod,
  SorterResult,
  SortOrder,
} from "antd/es/table/interface";
import TableColumnSchool from "@/components/table/columns/column-school";
import TableColumnSection from "@/components/table/columns/column-section";
import { SpecialtyResponse } from "@/lib/api/school/highschool/specialty/response";

export default function SpecialtyesTable(props: {
  isLoading?: boolean;
  data?: SpecialtyResponse[];
  orderBy?: string;
  sort?: SortOrder;
  selectedRowKeys?: React.Key[];
  onFilterSortChanged?: (
    filters: Record<string, FilterValue | null>,
    sorter:
      | SorterResult<SpecialtyResponse>
      | SorterResult<SpecialtyResponse>[]
  ) => void;
  onRowSelectionChanged?: (
    selectedRowKeys: React.Key[],
    selectedRows: SpecialtyResponse[],
    info: {
      type: RowSelectMethod;
    }
  ) => void;
  onRowSelectionSelected?: (
    record: SpecialtyResponse,
    selected: boolean,
    selectedRows: SpecialtyResponse[],
    nativeEvent: Event
  ) => void;
  onDetailsRequested?: (value: SpecialtyResponse, index: number) => void;
  onUpdateRequested?: (value: SpecialtyResponse, index: number) => void;
  onDeleteConfirmed?: (value: SpecialtyResponse, index: number) => void;
}) {
  // Table columns. dataIndex represents the field name(case sensitive) of the model(RecordType)
  const columns: TableColumnsType<SpecialtyResponse> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id", // Useful for row selection
      sortOrder: props.orderBy && props.orderBy === "id" ? props.sort : null,
      ...defaultColumnProps,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sortOrder: props.orderBy && props.orderBy === "name" ? props.sort : null,
      ...defaultColumnProps,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      sortOrder:
        props.orderBy && props.orderBy === "description" ? props.sort : null,
      ...defaultColumnProps,
    },
    {
      title: "School",
      dataIndex: "school",
      key: "school",
      sorter: false,
      ellipsis: {
        showTitle: false,
      },
      render: (_, record) => <TableColumnSchool record={record.school} />,
    },
    {
      title: "Section",
      dataIndex: "section",
      key: "section",
      sorter: false,
      ellipsis: {
        showTitle: false,
      },
      render: (_, record) => <TableColumnSection record={record.section} />,
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
        deleteDescription: "this specialty",
        onDetailsRequested: props.onDetailsRequested,
        onUpdateRequested: props.onUpdateRequested,
        onDeleteConfirmed: props.onDeleteConfirmed,
      }),
    },
  ];
  return (
    <div className="w-full mt-2">
      <Table<SpecialtyResponse>
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
