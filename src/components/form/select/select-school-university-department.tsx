"use client";

import { getDepartmentList } from "@/lib/api/school/university/department/routes";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Empty, Form, Select, Space, Spin } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { useEffect, useState } from "react";

export default function FormItemSelectSchoolUniversityDepartment(props: {
  disabled?: boolean;
  isLoading?: boolean;
  defaultValue?: string;
  schoolID?: number;
  size?: SizeType;
  updateFieldValue?: (name: string, values?: string) => void;
}) {
  const page = "1";
  const limit = "10";
  const [paramSearch, setParamSearch] = useState("");

  // Tanstack hooks
  const queryClient = useQueryClient();
  const queryKeyData = "select-school-university-department-data";
  const query = useQuery({
    queryKey: [queryKeyData, paramSearch, props.schoolID],
    queryFn: async ({ signal }) =>
      getDepartmentList(
        {
          schoolID: props.schoolID,
          search: paramSearch,
          page: page,
          limit: limit,
        },
        signal
      ),
  });

  const onSearch = (value: string) => {
    queryClient.removeQueries({
      queryKey: [queryKeyData, paramSearch, props.schoolID],
    });
    setParamSearch(value);
  };

  const onClear = () => {
    queryClient.removeQueries({
      queryKey: [queryKeyData, paramSearch, props.schoolID],
    });
    setParamSearch("");
  };

  useEffect(() => {
    query.refetch();
    return () => {};
  }, [props.schoolID]);

  return (
    <Form.Item
      label="Department"
      name="departmentID"
      initialValue={props.defaultValue}
      rules={[
        {
          required: true,
          message: "Please select the department!",
        },
      ]}
    >
      <Select
        disabled={props.isLoading || props.disabled}
        loading={query.isFetching}
        showSearch
        allowClear
        notFoundContent={
          query.isFetching ? (
            <Spin size="small" />
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )
        }
        size={props.size ?? "middle"}
        placeholder="Select department"
        optionFilterProp="label"
        filterOption={false}
        onSearch={onSearch}
        onClear={onClear}
        options={query.data?.data?.data?.map((item) => ({
          value: `${item.id}`,
          label: `${item.name}${
            item.description ? `(${item.description})` : ""
          }${item.faculty?.name ? ` of ${item.faculty?.name}` : ""}`,
        }))}
        optionRender={(option) => <Space>{option.data.label}</Space>}
      />
    </Form.Item>
  );
}
