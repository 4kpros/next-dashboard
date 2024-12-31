import FormModalFooter from "@/components/form/form-modal-footer";
import { DirectorRequest } from "@/lib/api/school/director/request";
import { DirectorResponse } from "@/lib/api/school/director/response";
import { Form } from "antd";
import FormAlertDefaultError from "@/components/form/alert/default-error";
import FormAlertDefaultDescription from "@/components/form/alert/default-description";
import FormItemSelectSchool from "@/components/form/select/select-school";
import FormItemSelectUser from "@/components/form/select/select-user";
import { ROLE_DIRECTOR } from "@/lib/constants/role";

export default function FormAddUpdateDirector(props: {
  isLoading?: boolean;
  item?: DirectorResponse | null;
  canSubmit?: boolean;
  canSubmitMessage?: string;
  errorMessage?: string;
  onValuesChange?: (values: DirectorRequest) => void;
  onSubmit?: (data: DirectorRequest) => void;
  onCancel?: () => void;
}) {
  return (
    <Form<DirectorRequest>
      name="form-add-update-director"
      layout={"vertical"}
      className="w-full"
      onFinish={props.onSubmit}
      onValuesChange={(_changed, values) => {
        if (props.onValuesChange) {
          props.onValuesChange(values);
        }
      }}
      autoComplete="on"
    >
      <br />

      <FormItemSelectSchool
        isLoading={props.isLoading}
        defaultValue={props.item?.school?.id?.toString()}
        size="middle"
      />
      <FormItemSelectUser
        isLoading={props.isLoading}
        defaultValue={props.item?.user?.id?.toString()}
        role={ROLE_DIRECTOR}
        size="middle"
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
