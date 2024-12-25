import { SCHOOL_TYPES } from "@/lib/constants/school";
import { Empty, Form, Select } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";

export default function FormItemSelectSchoolType(props: {
  isLoading?: boolean;
  defaultValue?: string;
  size?: SizeType;
}) {
  return (
    <Form.Item
      label="Type"
      name="type"
      initialValue={props.defaultValue}
      rules={[
        {
          required: true,
          message: "Please select the type!",
        },
      ]}
    >
      <Select
        disabled={props.isLoading}
        showSearch
        allowClear
        notFoundContent={<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
        size={props.size ?? "middle"}
        placeholder="Select type"
        options={SCHOOL_TYPES.map((item) => ({
          label: item,
          value: item,
        }))}
      />
    </Form.Item>
  );
}
