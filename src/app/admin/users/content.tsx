"use client";

import React, { useState } from "react";
import { Button, theme, Typography } from "antd";
import {
  CloseOutlined,
  DeleteOutlined,
  PlusOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import UsersTable from "@/components/tables/users-table";
import DeleteModal from "@/components/modal/delete";
import FormAddUser from "./components/form-add-user";
import FormUpdateUser from "./components/form-update-user";
import CustomModalWithoutFooter from "@/components/modal/custom-without-footer";

const { Text } = Typography;

export default function PageContent() {
  const {
    token: { colorPrimaryBg, colorBgContainer, borderRadius },
  } = theme.useToken();

  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [updateUserModalOpen, setUpdateUserModalOpen] = useState(false);
  const [deleteUserModalOpen, setDeleteUserModalOpen] = useState(false);

  return (
    <>
      <div
        style={{
          padding: "15px",
          background: colorBgContainer,
          borderRadius: borderRadius,
          minHeight: "100vh",
        }}
      >
        <div className="w-full flex flex-row items-center justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="primary"
              size="large"
              icon={<PlusOutlined />}
              onClick={() => setAddUserModalOpen(true)}
            >
              Add
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-1">
            <Text ellipsis={true}>
              Results for search keyword
              <span className="font-extrabold mx-2">test</span>
            </Text>
            <Button
              icon={<CloseOutlined />}
              type="text"
              style={{ backgroundColor: colorPrimaryBg }}
            >
              Clear
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              icon={<DeleteOutlined />}
              onClick={() => setDeleteUserModalOpen(true)}
            >
              Delete selection
            </Button>
            <Button icon={<PrinterOutlined />}>Print this page</Button>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 mt-3">
          <Text code ellipsis={true}>
            0 selected items
          </Text>
          <Text code ellipsis={true}>
            Page 1/5
          </Text>
        </div>
        <UsersTable openUpdateUserModal={() => setUpdateUserModalOpen(true)} />
      </div>

      {/* Add new user modal */}
      <CustomModalWithoutFooter
        title="Add new user"
        content={
          <FormAddUser
            onSubmit={() => setAddUserModalOpen(false)}
            onCancel={() => setAddUserModalOpen(false)}
          />
        }
        modalOpen={addUserModalOpen}
        onOk={() => setAddUserModalOpen(false)}
        onCancel={() => setAddUserModalOpen(false)}
        maskClosable={false}
      />

      {/* Update user modal */}
      <CustomModalWithoutFooter
        title="Update user"
        content={
          <FormUpdateUser
            onSubmit={() => setUpdateUserModalOpen(false)}
            onCancel={() => setUpdateUserModalOpen(false)}
          />
        }
        modalOpen={updateUserModalOpen}
        onOk={() => setUpdateUserModalOpen(false)}
        onCancel={() => setUpdateUserModalOpen(false)}
        maskClosable={false}
      />

      {/* Delete user modal */}
      <DeleteModal
        description="Do you really want to delete all selected user(s) ? This is not a reversible action!"
        modalOpen={deleteUserModalOpen}
        onOk={() => setDeleteUserModalOpen(false)}
        onCancel={() => setDeleteUserModalOpen(false)}
      />
    </>
  );
}
