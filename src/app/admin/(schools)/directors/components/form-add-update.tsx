import FormModalFooter from "@/components/form/form-modal-footer";
import FormItemSelectSchool from "@/components/form/select/select-school";
import FormItemSelectUser from "@/components/form/select/select-user";
import { DirectorRequest } from "@/lib/api/director/request";
import { DirectorResponse } from "@/lib/api/director/response";
import { Alert, Form } from "antd";

export default function FormAddUpdateDirector(props: {
  isLoading?: boolean;
  director?: DirectorResponse | null;
  canSubmit?: boolean;
  canSubmitMessage?: string;
  errorMessage?: string;
  onValuesChange?: (values: DirectorRequest) => void;
  onSubmit?: (director: DirectorRequest) => void;
  onCancel?: () => void;
}) {
  return (
    <Form<DirectorRequest>
      name="form-add-update-director"
      layout={"vertical"}
      onFinish={props.onSubmit}
      onValuesChange={(_changed, values) => {
        props.onValuesChange!(values);
      }}
      autoComplete="on"
    >
      <br />

      <FormItemSelectSchool
        isLoading={props.isLoading}
        defaultValue={props.director?.schoolID?.toString()}
      />
      <FormItemSelectUser
        isLoading={props.isLoading}
        defaultValue={props.director?.userID?.toString()}
      />

      <br />
      <Alert
        showIcon={false}
        style={{
          height:
            props.errorMessage && props.errorMessage.length > 0
              ? "auto"
              : "0px",
          padding:
            props.errorMessage && props.errorMessage.length > 0
              ? "8px 12px"
              : "0px",
          borderWidth:
            props.errorMessage && props.errorMessage.length > 0 ? "1px" : "0px",
          marginBottom:
            props.errorMessage && props.errorMessage.length > 0
              ? "10px"
              : "0px",
        }}
        message={
          props.errorMessage && props.errorMessage.length > 0
            ? props.errorMessage
            : undefined
        }
        type="error"
        className="transition-all duration-150 ease-in-out"
      />
      {props.canSubmitMessage && props.canSubmitMessage.length > 0 ? (
        <div className="w-full flex items-center justify-end">
          <p className="w-auto text-end opacity-75">{props.canSubmitMessage}</p>
        </div>
      ) : null}
      <FormModalFooter
        isLoading={props.isLoading}
        canSubmit={props.canSubmit}
        onCancel={props.onCancel}
      />
    </Form>
  );
}
