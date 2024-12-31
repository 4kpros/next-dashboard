import FormModalFooter from "@/components/form/form-modal-footer";
import { YearRequest } from "@/lib/api/school/year/request";
import { YearResponse } from "@/lib/api/school/year/response";
import { Form } from "antd";
import FormAlertDefaultError from "@/components/form/alert/default-error";
import FormAlertDefaultDescription from "@/components/form/alert/default-description";
import FormItemDateTime from "@/components/form/date/date";
import dayjs from "dayjs";

export default function FormAddUpdateYear(props: {
  isLoading?: boolean;
  item?: YearResponse | null;
  canSubmit?: boolean;
  canSubmitMessage?: string;
  errorMessage?: string;
  onValuesChange?: (values: YearRequest) => void;
  onSubmit: (data: YearRequest) => void;
  onCancel: () => void;
}) {
  return (
    <Form<YearRequest>
      name="form-add-update-year"
      layout={"vertical"}
      onFinish={props.onSubmit}
      onValuesChange={(_changed, values) => {
        if (props.onValuesChange) {
          props.onValuesChange(values);
        }
      }}
      autoComplete="on"
    >
      <br />
      <FormItemDateTime
        label="Start date"
        name="startDate"
        size="middle"
        isLoading={props.isLoading}
        defaultValue={dayjs(props.item?.startDate?.toString())}
      />
      <FormItemDateTime
        label="End date"
        name="endDate"
        size="middle"
        isLoading={props.isLoading}
        defaultValue={dayjs(props.item?.endDate?.toString())}
      />

      <br />

      <FormAlertDefaultError errorMessage={props.errorMessage} />
      <FormAlertDefaultDescription canSubmitMessage={props.canSubmitMessage} />
      <FormModalFooter
        isLoading={props.isLoading}
        canSubmit={props.canSubmit}
        onCancel={props.onCancel}
      />
    </Form>
  );
}
