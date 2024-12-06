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

