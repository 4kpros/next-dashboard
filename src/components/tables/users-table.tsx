'use client';

import React, { useState } from 'react';
import type { GetProp, TableProps } from 'antd';
import { Button, Popconfirm, Space, Table, Tag, Tooltip } from 'antd';
import { NewUserList, User } from '@/models/admin/user/user.types';

type SizeType = TableProps['size'];
type ColumnsType<T extends object> = GetProp<TableProps<T>, 'columns'>;
type TablePagination<T extends object> = NonNullable<Exclude<TableProps<T>['pagination'], boolean>>;
type TablePaginationPosition = NonNullable<TablePagination<object>['position']>[number];
type ExpandableConfig<T extends object> = TableProps<T>['expandable'];
type TableRowSelection<T extends object> = TableProps<T>['rowSelection'];

const columns: ColumnsType<User> = [
  {
    title: 'ID',
    dataIndex: 'ID',
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
    title: 'Email',
    dataIndex: 'Email',
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
    title: 'Phone number',
    dataIndex: 'PhoneNumber',
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
    title: 'Role',
    dataIndex: 'RoleId',
    sorter: true,
    ellipsis: {
      showTitle: false,
    },
    render: (value) => (
      <span>
        {value == 1 ? "Default" : "Student"}
      </span>
    ),
  },
  {
    title: 'Login method',
    dataIndex: 'LoginMethod',
    sorter: true,
    ellipsis: {
      showTitle: false,
    },
    render: (value: string) => (
      <span>
        { value == "default" ? "Email/Phone" : value }
      </span>
    ),
  },
  {
    title: 'Account activation',
    dataIndex: 'IsActivated',
    sorter: true,
    ellipsis: {
      showTitle: false,
    },
    render: (value: boolean) => (
      value ? <Tag color="green">Activated</Tag> : <Tag color="orange">Not activated</Tag>
    ),
  },
  {
    title: 'Multiple factor authentication',
    dataIndex: 'IsMfaEnabled',
    sorter: true,
    ellipsis: {
      showTitle: false,
    },
    render: (value: boolean) => (
      value ? <Tag color="green">Enabled</Tag> : <Tag color="orange">Not enabled</Tag>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    sorter: true,
    render: () => (
      <Space size="small">
        <Button type="link">Update</Button>
        <Popconfirm
          title="Delete"
          description="Do you really want to delete this user?"
          placement="topRight"
          okText="Yes"
          cancelText="Cancel"
          onConfirm={() => {}}
          onOpenChange={() => console.log('open change')}
        >
          <Button type="link" style={{ color:"red"}}>Delete</Button>
        </Popconfirm>
      </Space>
    ),
  },
];

const data = NewUserList(100);

const defaultTitle = () => 'Users management';
const defaultFooter = () => 'Here is footer';

export default function UsersTable() {
  const [bordered, setBordered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState<SizeType>('large');
  const [expandable, setExpandable] = useState<ExpandableConfig<User>>();
  const [showTitle, setShowTitle] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(false);
  const [rowSelection, setRowSelection] = useState<TableRowSelection<User> | undefined>({});
  const [hasData, setHasData] = useState(true);
  const [tableLayout, setTableLayout] = useState();
  const [top, setTop] = useState<TablePaginationPosition>('none');
  const [bottom, setBottom] = useState<TablePaginationPosition>('bottomRight');
  const [ellipsis, setEllipsis] = useState(true);
  const [yScroll, setYScroll] = useState(false);
  const [xScroll, setXScroll] = useState<string>();
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);

  const handleLoadingChange = (enable: boolean) => {
    setLoading(enable);
  };

  const scroll: { x?: number | string; y?: number | string } = {};
  if (yScroll) {
    scroll.y = 240;
  }
  if (xScroll) {
    scroll.x = '100vw';
  }

  const tableColumns = columns.map((item) => ({ ...item, ellipsis }));
  if (xScroll === 'fixed') {
    tableColumns[0].fixed = true;
    tableColumns[tableColumns.length - 1].fixed = 'right';
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
      pagination={{ position: [top, bottom], defaultPageSize: 20, pageSize: pageSize, onChange(newPage, newPageSize) {
        setPage(newPage)
        setPageSize(newPageSize)
      },}}
      columns={tableColumns}
      dataSource={hasData ? data : []}
      scroll={scroll}
    />
  );
};

