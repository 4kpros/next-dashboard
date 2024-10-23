"use client";

import React, { useState } from "react";
import type { GetProp, TableProps } from "antd";
import { Button, Popconfirm, Space, Table, Tag, Tooltip } from "antd";
import { NewUserList, User } from "@/models/admin/user/user.types";

type SizeType = TableProps["size"];
type ColumnsType<T extends object> = GetProp<TableProps<T>, "columns">;
type TablePagination<T extends object> = NonNullable<
  Exclude<TableProps<T>["pagination"], boolean>
>;
type TablePaginationPosition = NonNullable<
  TablePagination<object>["position"]
>[number];
type ExpandableConfig<T extends object> = TableProps<T>["expandable"];
type TableRowSelection<T extends object> = TableProps<T>["rowSelection"];

const data = NewUserList(100);

const defaultTitle = () => "Users management";
const defaultFooter = () => "Here is footer";

export default function UsersTable(props: { openUpdateUserModal: () => void }) {
  const [bordered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [size] = useState<SizeType>("large");
  const [expandable] = useState<ExpandableConfig<User>>();
  const [showTitle] = useState(false);
  const [showHeader] = useState(true);
  const [showFooter] = useState(false);
  const [rowSelection] = useState<TableRowSelection<User> | undefined>({});
  const [hasData] = useState(true);
  const [tableLayout] = useState();
  const [top] = useState<TablePaginationPosition>("none");
  const [bottom] = useState<TablePaginationPosition>("bottomRight");
  const [ellipsis] = useState(true);
  const [yScroll] = useState(false);
  const [xScroll] = useState<string>();
  const [pageSize, setPageSize] = useState<number>(20);

  // TODO to remove
  if (loading) {
    setLoading(false)
  }

  const columns: ColumnsType<User> = [
    {
      title: "ID",
      dataIndex: "ID",
      sorter: true,
      ellipsis: {
        showTitle: false,
      },
      render: (value) => (
        <Tooltip placement="topLeft" title={value}>
          {value}
        </Tooltip>
      ),
    },
    {
      title: "Email",
      dataIndex: "Email",
      sorter: true,
      ellipsis: {
        showTitle: false,
      },
      render: (value) => (
        <Tooltip placement="topLeft" title={value}>
          {value}
        </Tooltip>
      ),
    },
    {
      title: "Phone number",
      dataIndex: "PhoneNumber",
      sorter: true,
      ellipsis: {
        showTitle: false,
      },
      render: (value: string) => (
        <Tooltip placement="topLeft" title={value}>
          {value}
        </Tooltip>
      ),
    },
    {
      title: "Role",
      dataIndex: "RoleId",
      sorter: true,
      ellipsis: {
        showTitle: false,
      },
      render: (value) => <span>{value == 1 ? "Default" : "Student"}</span>,
    },
    {
      title: "Activation",
      dataIndex: "IsActivated",
      sorter: true,
      ellipsis: {
        showTitle: false,
      },
      render: (value: boolean) =>
        value ? (
          <Tag color="green">Activated</Tag>
        ) : (
          <Tag color="orange">Not activated</Tag>
        ),
    },
    {
      title: "Action",
      key: "action",
      sorter: true,
      render: () => (
        <Space size="small">
          <Button type="link" onClick={props.openUpdateUserModal}>
            Update
          </Button>
          <Popconfirm
            title="Delete"
            description="Do you really want to delete this user?"
            placement="topRight"
            okText="Yes"
            cancelText="Cancel"
            onConfirm={() => {}}
            onOpenChange={() => console.log("open change")}
          >
            <Button type="link" style={{ color: "red" }}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const scroll: { x?: number | string; y?: number | string } = {};
  if (yScroll) {
    scroll.y = 240;
  }
  if (xScroll) {
    scroll.x = "100vw";
  }

  const tableColumns = columns.map((item) => ({ ...item, ellipsis }));
  if (xScroll === "fixed") {
    tableColumns[0].fixed = true;
    tableColumns[tableColumns.length - 1].fixed = "right";
  }

  const tableProps: TableProps<User> = {
    bordered,
    loading,
    size,
    expandable,
    title: showTitle ? defaultTitle : undefined,
    showHeader,
    footer: showFooter ? defaultFooter : undefined,
    rowSelection,
    scroll,
    tableLayout,
  };

  return (
    <Table<User>
      {...tableProps}
      pagination={{
        position: [top, bottom],
        defaultPageSize: 20,
        pageSize: pageSize,
        onChange(newPage, newPageSize) {
          setPageSize(newPageSize);
        },
      }}
      columns={tableColumns}
      dataSource={hasData ? data : []}
      scroll={scroll}
      style={{ marginTop: "10px" }}
    />
  );
}
