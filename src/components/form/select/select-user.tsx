import { getUserList } from "@/lib/api/user/routes";
import { useQuery } from "@tanstack/react-query";
import { Empty, Form, Select, Space, Spin } from "antd";
import { useState } from "react";
import GoogleIcon from "../../icons/iconfinder/google";
import FacebookIcon from "../../icons/iconfinder/facebook";
import { SizeType } from "antd/es/config-provider/SizeContext";

export default function FormItemSelectUser(props: {
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
  const queryKeyData = "select-users-data";
  const query = useQuery({
    queryKey: [queryKeyData, paramSearch],
    queryFn: async ({ signal }) =>
      getUserList(
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
      label="User"
      name="userID"
      initialValue={props.defaultValue}
      rules={[
        {
          required: true,
          message: "Please select the user!",
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
        placeholder="Select user"
        optionFilterProp="label"
        filterOption={false}
        onSearch={onSearch}
        onClear={onClear}
        options={query.data?.data?.data?.map((item) => ({
          label: `${item.email}(${item.info?.firstName} ${item.info?.lastName})`,
          value: `${item.id}`,
          icon:
            item.provider === "google" ? (
              <GoogleIcon width={16} height={16} />
            ) : item.provider === "google" ? (
              <FacebookIcon width={16} height={16} />
            ) : null,
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
