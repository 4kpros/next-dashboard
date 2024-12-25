"use client";

import { getFacultyList } from "@/lib/api/school/university/faculty/routes";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Empty, Form, Select, Space, Spin } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { useEffect, useState } from "react";

export default function FormItemSelectSchoolUniversityFaculty(props: {
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
  const queryKeyData = "select-school-university-faculty-data";
  const query = useQuery({
    queryKey: [queryKeyData, paramSearch, props.schoolID],
    queryFn: async ({ signal }) =>
      getFacultyList(
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
      label="Faculty"
      name="facultyID"
      initialValue={props.defaultValue}
      rules={[
        {
          required: true,
          message: "Please select the faculty!",
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
        placeholder="Select faculty"
        optionFilterProp="label"
        filterOption={false}
        onSearch={onSearch}
        onClear={onClear}
        options={query.data?.data?.data?.map((item) => ({
          value: `${item.id}`,
          label: `${item.name}${
            item.description ? `(${item.description})` : ""
          }`,
        }))}
        optionRender={(option) => <Space>{option.data.label}</Space>}
      />
    </Form.Item>
  );
}