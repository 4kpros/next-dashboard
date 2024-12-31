import { getUserList } from "@/lib/api/user/user/routes";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Empty, Form, Select, Space, Spin } from "antd";
import { useState } from "react";
import GoogleIcon from "../../icons/iconfinder/google";
import FacebookIcon from "../../icons/iconfinder/facebook";
import { SizeType } from "antd/es/config-provider/SizeContext";

export default function FormItemSelectUser(props: {
  isLoading?: boolean;
  defaultValue?: string;
  role?: string;
  size?: SizeType;
}) {
  const page = "1";
  const limit = "10";
  const [paramSearch, setParamSearch] = useState("");

  // Tanstack hooks
  const queryClient = useQueryClient();
  const queryKeyData = "select-user-data";
  const query = useQuery({
    queryKey: [queryKeyData, paramSearch, props.role],
    queryFn: async ({ signal }) =>
      getUserList(
        {
          role: props.role,
          search: paramSearch,
          page: page,
          limit: limit,
        },
        signal
      ),
  });

  const onSearch = (value: string) => {
    queryClient.removeQueries({
      queryKey: [queryKeyData, paramSearch, props.role],
    });
    setParamSearch(value);
  };

  const onClear = () => {
    queryClient.removeQueries({
      queryKey: [queryKeyData, paramSearch, props.role],
    });
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
        options={query.data?.data?.data?.map((item) => {
          const fullNameTrunc =
            (item?.info?.firstName?.substring(0, 1) ?? "") +
            (item?.info?.lastName?.substring(0, 1) ?? "");

            const fullName =
            fullNameTrunc.length < 1
              ? ""
              : `${item?.info?.firstName} ${item?.info?.lastName}`;
          return {
            label: `${item.email}${fullName.length > 0 ? `(${fullName})` : ""}`,
            value: `${item.id}`,
            icon:
              item.provider === "google" ? (
                <GoogleIcon width={16} height={16} />
              ) : item.provider === "facebook" ? (
                <FacebookIcon width={16} height={16} />
              ) : null,
          };
        })}
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
