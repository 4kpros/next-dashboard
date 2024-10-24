"use client";

import React, { useState } from "react";
import { theme } from "antd";
import UsersTable from "@/components/tables/users-table";
import DeleteModal from "@/components/modal/delete";
import FormAddUser from "./components/form-add-user";
import FormUpdateUser from "./components/form-update-user";
import CustomModalWithoutFooter from "@/components/modal/custom-without-footer";
import DefaultTableHeaderInfo from "@/components/tables/headers/default-header-info";
import DefaultTableHeader from "@/components/tables/headers/default-header";

export default function PageContent() {
  const {
    token: { colorBgContainer, borderRadius },
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
        <DefaultTableHeader
          searchKeyword={"prosper"}
          onAdd={() => {
            setAddUserModalOpen(true);
          }}
          onRefresh={() => {}}
          onDelete={() => {
            setDeleteUserModalOpen(true);
          }}
          onPrint={() => {}}
        />
        <DefaultTableHeaderInfo totalPages={5} />
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
