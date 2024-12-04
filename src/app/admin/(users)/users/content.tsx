"use client";

import { useState } from "react";
import { theme as antdTheme } from "antd";
import DeleteModal from "@/components/modal/delete";
import FormAddUser from "./components/form-add-user";
import FormUpdateUser from "./components/form-update-user";
import CustomModalWithoutFooter from "@/components/modal/custom-without-footer";
import DefaultTableHeaderInfo from "@/components/tables/headers/default-header-info";
import DefaultTableHeader from "@/components/tables/headers/default-header";
import UsersTable from "./components/table";
import { newUserList } from "@/types/user/response";

export default function PageContent() {
  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();
  
  // React hooks
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [updateUserModalOpen, setUpdateUserModalOpen] = useState(false);
  const [deleteUserModalOpen, setDeleteUserModalOpen] = useState(false);

  const isLoading = false;
  const data = newUserList(100);
  const pageSize = 30;

  return (
    <>
      <div
        style={{
          padding: "15px",
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
        <UsersTable
          isLoading={isLoading}
          data={data}
          pageSize={pageSize}
          selectedRowKeys={selectedRowKeys}
          onPaginationChanged={(page: number, pageSize: number) => {
            console.log("onPaginationChanged");
            console.log("------> Page: ", page);
            console.log("------> pageSize: ", pageSize);
            // TODO
          }}
          onFilterSortChanged={(filters, sorter) => {
            console.log("onFilterSortChanged");
            console.log("------> filters: ", filters);
            console.log("------> sorter: ", sorter);
            // TODO
          }}
          onRowSelectionChanged={(selectedRowKeys, selectedRows, info) => {
            setSelectedRowKeys(selectedRowKeys);
            console.log("onRowSelectionChanged");
            console.log("------> selectedRowKeys: ", selectedRowKeys);
            console.log("------> selectedRows: ", selectedRows);
            console.log("------> info: ", info);
            // TODO
          }}
          onUpdateRequested={(value, index) => {
            setUpdateUserModalOpen(true);
            console.log("onUpdateRequested");
            console.log("------> value: ", value);
            console.log("------> index: ", index);
            // TODO
          }}
          onDeleteConfirmed={(value, index) => {
            console.log("onDeleteConfirmed");
            console.log("------> value: ", value);
            console.log("------> index: ", index);
            // TODO
          }}
        />
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
