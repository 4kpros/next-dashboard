import { TABLES } from "@/lib/constants/permission-table";
import { Empty, Form, Select } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";

export default function FormItemSelectPermissionTable(props: {
  isLoading?: boolean;
  defaultValue?: string;
  size?: SizeType;
}) {
  return (
    <Form.Item
      label="Table name"
      name="tableName"
      initialValue={props.defaultValue}
      rules={[
        {
          required: true,
          message: "Please select the table!",
        },
      ]}
    >
      <Select
        disabled={props.isLoading}
        showSearch
        allowClear
        notFoundContent={<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
        size={props.size ?? "middle"}
        placeholder="Select feature"
        options={TABLES.map((item) => ({
          label: item == "*" ? "* (all tables)" : item,
          value: item,
        }))}
      />
    </Form.Item>
  );
}
