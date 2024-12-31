import { FEATURES } from "@/lib/features";
import { Empty, Form, Select } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";

export default function FormItemSelectFeature(props: {
  isLoading?: boolean;
  defaultValue?: string;
  size?: SizeType;
}) {
  return (
    <Form.Item
      label="Feature"
      name="feature"
      initialValue={props.defaultValue}
      rules={[
        {
          required: true,
          message: "Please select the feature!",
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
        options={FEATURES.map((item) => ({
          label: item,
          value: item,
        }))}
      />
    </Form.Item>
  );
}
