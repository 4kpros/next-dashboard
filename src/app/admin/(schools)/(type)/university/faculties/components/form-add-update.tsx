import FormModalFooter from "@/components/form/form-modal-footer";
import { Form } from "antd";
import FormAlertDefaultError from "@/components/form/alert/default-error";
import FormAlertDefaultDescription from "@/components/form/alert/default-description";
import FormItemSelectSchool from "@/components/form/select/select-school";
import { FacultyResponse } from "@/lib/api/school/university/faculty/response";
import { FacultyRequest } from "@/lib/api/school/university/faculty/request";
import { SCHOOL_TYPE_UNIVERSITY } from "@/lib/constants/school";
import FormItemInputText from "@/components/form/input/input-text";

export default function FormAddUpdateFaculty(props: {
  isLoading?: boolean;
  item?: FacultyResponse | null;
  canSubmit?: boolean;
  canSubmitMessage?: string;
  errorMessage?: string;
  onValuesChange?: (values: FacultyRequest) => void;
  onSubmit?: (data: FacultyRequest) => void;
  onCancel?: () => void;
}) {
  return (
    <Form<FacultyRequest>
      name="form-add-update-faculty"
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
        hideType={true}
        type={SCHOOL_TYPE_UNIVERSITY}
      />
      
      <FormItemInputText
        label="Name"
        name="name"
        placeholder="Enter the faculty name"
        size="middle"
        isLoading={props.isLoading}
        defaultValue={props.item?.name}
        rules={[
          {
            required: true,
            message: "Please enter the faculty name!",
          },
        ]}
      />

      <FormItemInputText
        label="Description"
        name="description"
        placeholder="Enter the faculty description"
        size="middle"
        isLoading={props.isLoading}
        defaultValue={props.item?.description}
        rules={[
          {
            required: false,
          },
        ]}
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
