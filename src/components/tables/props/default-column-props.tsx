import { formatDateTimeToSince } from "@/helpers/date/format";
import { EyeOutlined } from "@ant-design/icons";
import { Popconfirm, Space, Tag, Tooltip } from "antd";
import { ColumnType } from "antd/es/table";

// Default column props for string
export const defaultColumnProps = {
  sorter: true,
  ellipsis: {
    showTitle: false,
  },
  render: (value: string) => (
    <Tooltip placement="topLeft" title={value}>
      {value}
    </Tooltip>
  ),
};

export const defaultColumnDateTimeProps = {
  sorter: true,
  ellipsis: {
    showTitle: false,
  },
  render: (value: string) => {
    return (
      <Tooltip placement="topLeft" title={value}>
        {formatDateTimeToSince(value)}
      </Tooltip>
    );
  },
};

// Default column props for boolean
export const defaultColumnBooleanProps = {
  sorter: true,
  ellipsis: {
    showTitle: false,
  },
  render: (value: boolean) =>
    value ? <Tag color="green">Yes</Tag> : <Tag color="orange">No</Tag>,
};

// Default column props for user actions
export function defaultColumnActionProps<T>(props: {
  deleteDescription?: string | null;
  onDetailsRequested?: (value: T, index: number) => void;
  onUpdateRequested?: (value: T, index: number) => void;
  onDeleteConfirmed?: (value: T, index: number) => void;
}): ColumnType<T> {
  return {
    title: "Action",
    key: "action",
    sorter: false,
    render: (_, record, index) => (
      <Space size="large">
        <a
          className="w-auto"
          onClick={() => {
            props.onDetailsRequested!(record, index);
          }}
        >
          <EyeOutlined />
        </a>
        <a
          onClick={() => {
            props.onUpdateRequested!(record, index);
          }}
        >
          Update
        </a>
        <Popconfirm
          title="Delete"
          description={`Do you really want to delete ${props.deleteDescription} ?`}
          placement="topRight"
          okText="Yes"
          cancelText="Cancel"
          onConfirm={() => {
            props.onDeleteConfirmed!(record, index);
          }}
        >
          <a style={{ color: "red" }}>Delete</a>
        </Popconfirm>
      </Space>
    ),
  };
}
