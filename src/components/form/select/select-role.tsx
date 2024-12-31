import { getRoleList } from "@/lib/api/user/role/routes";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Empty, Form, Select, Space, Spin } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { useState } from "react";

export default function FormItemSelectRole(props: {
  isLoading?: boolean;
  defaultValue?: string;
  size?: SizeType;
}) {
  const page = "1";
  const limit = "10";
  const [paramSearch, setParamSearch] = useState("");

  // Tanstack hooks
  const queryClient = useQueryClient();
  const queryKeyData = "select-role-data";
  const query = useQuery({
    queryKey: [queryKeyData, paramSearch],
    queryFn: async ({ signal }) =>
      getRoleList(
        {
          search: paramSearch,
          page: page,
          limit: limit,
        },
        signal
      ),
  });

  const onSearch = (value: string) => {
    queryClient.removeQueries({
      queryKey: [queryKeyData, paramSearch],
    });
    setParamSearch(value);
  };

  const onClear = () => {
    queryClient.removeQueries({
      queryKey: [queryKeyData, paramSearch],
    });
    setParamSearch("");
  };

  return (
    <Form.Item
      label="Role"
      name="roleID"
      initialValue={props.defaultValue}
      rules={[
        {
          required: true,
          message: "Please select the role!",
        },
      ]}
    >
      <Select
        disabled={props.isLoading}
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
        placeholder="Select role"
        optionFilterProp="label"
        filterOption={false}
        onSearch={onSearch}
        onClear={onClear}
        options={query.data?.data?.data?.map((item) => ({
          label: `${item.name}(${item.feature})`,
          value: `${item.id}`,
          icon: null,
        }))}
        optionRender={(option) => (
          <Space>
            {option.data.label}
            {option.data.icon}
          </Space>
        )}
      />
    </Form.Item>
  );
}
