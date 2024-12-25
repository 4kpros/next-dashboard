import { DATE_FORMAT, formatDate } from "@/helpers/date/format";
import { DatePicker, Form } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import dayjs from "dayjs";

export default function FormItemDateTime(props: {
  isLoading?: boolean;
  required?: boolean;
  label?: string;
  name?: string | string[];
  defaultValue?: dayjs.Dayjs;
  size?: SizeType;
}) {
  return (
    <Form.Item
      required={props.required}
      label={props.label}
      name={props.name}
      initialValue={props.defaultValue}
      getValueProps={(i) => ({ value: i })}
    >
      <DatePicker
        allowClear={false}
        disabled={props.isLoading}
        format={DATE_FORMAT}
        defaultValue={
          props.defaultValue
            ? formatDate(props.defaultValue.toString())
            : undefined
        }
        size={props.size ?? "middle"}
        placeholder="Pick the date"
      />
    </Form.Item>
  );
}
