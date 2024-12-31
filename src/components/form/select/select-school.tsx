import { getSchoolList } from "@/lib/api/school/school/routes";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Empty, Form, Select, Space, Spin } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { useState } from "react";

export default function FormItemSelectSchool(props: {
  isLoading?: boolean;
  defaultValue?: string;
  hideType?: boolean;
  type?: string;
  size?: SizeType;
}) {
  const page = "1";
  const limit = "10";
  const [paramSearch, setParamSearch] = useState("");

  // Tanstack hooks
  const queryClient = useQueryClient();
  const queryKeyData = "select-school-data";
  const query = useQuery({
    queryKey: [queryKeyData, paramSearch, props.type],
    queryFn: async ({ signal }) =>
      getSchoolList(
        {
          type: props.type,
          search: paramSearch,
          page: page,
          limit: limit,
        },
        signal
      ),
  });

  const onSearch = (value: string) => {
    queryClient.removeQueries({
      queryKey: [queryKeyData, paramSearch, props.type],
    });
    setParamSearch(value);
  };

  const onClear = () => {
    queryClient.removeQueries({
      queryKey: [queryKeyData, paramSearch, props.type],
    });
    setParamSearch("");
  };

  return (
    <Form.Item
      label="School"
      name="schoolID"
      initialValue={props.defaultValue}
      rules={[
        {
          required: true,
          message: "Please select the school!",
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
        placeholder="Select school"
        optionFilterProp="label"
        filterOption={false}
        onSearch={onSearch}
        onClear={onClear}
        options={query.data?.data?.data?.map((item) => ({
          value: `${item.id}`,
          type: `${item?.type ?? "NA"}`,
          label: `${item.name}(${item.info?.fullName ?? "NA"})`,
        }))}
        optionRender={(option) => (
          <Space>
            {props.hideType === true ? "" : `${option.data.type}`}
            {props.hideType === true ? "" : "-"}
            {option.data.label}
          </Space>
        )}
      />
    </Form.Item>
  );
}
