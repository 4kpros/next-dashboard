"use client";

import { theme } from "antd";
import DefaultTableHeader from '@/components/tables/headers/default-header';
import DefaultTableHeaderInfo from '@/components/tables/headers/default-header-info';

export default function PageContent() {
    const {
      token: { colorBgContainer, borderRadius },
    } = theme.useToken();

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
          onAdd={() => {}}
          onRefresh={() => {}}
          onDelete={() => {}}
          onPrint={() => {}}
        />
        <DefaultTableHeaderInfo totalPages={5} />
      </div>
    </>
  )
}
