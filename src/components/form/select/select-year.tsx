import { getYearList } from "@/lib/api/year/routes";
import { useQuery } from "@tanstack/react-query";
import { Empty, Form, Select, Space, Spin } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { useState } from "react";

export default function FormItemSelectYear(props: {
  isLoading?: boolean;
  defaultValue?: string;
  size?: SizeType;
}) {
  const page = "1";
  const limit = "10";
  const [paramSearch, setParamSearch] = useState(
    props.defaultValue ? props.defaultValue : ""
  );

  // Tanstack hooks
  const queryKeyData = "select-years-data";
  const query = useQuery({
    queryKey: [queryKeyData, paramSearch],
    queryFn: async ({ signal }) =>
      getYearList(
        {
          search: paramSearch,
          page: page,
          limit: limit,
        },
        signal
      ),
  });

  const onSearch = (value: string) => {
    setParamSearch(value);
  };

  const onClear = () => {
    setParamSearch("");
  };

  return (
    <Form.Item
      label="Year"
      name="yearID"
      initialValue={props.defaultValue}
      rules={[
        {
          required: true,
          message: "Please select the year!",
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
        placeholder="Select year"
        optionFilterProp="label"
        filterOption={false}
        onSearch={onSearch}
        onClear={onClear}
        options={query.data?.data?.data?.map((item) => ({
          label: `${item.startDate} - ${item.endDate}`,
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
