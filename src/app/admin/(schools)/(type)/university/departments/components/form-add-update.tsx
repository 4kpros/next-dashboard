"use client";

import FormModalFooter from "@/components/form/form-modal-footer";
import { Form } from "antd";
import FormAlertDefaultError from "@/components/form/alert/default-error";
import FormAlertDefaultDescription from "@/components/form/alert/default-description";
import FormItemSelectSchool from "@/components/form/select/select-school";
import { SCHOOL_TYPE_UNIVERSITY } from "@/lib/constants/school";
import { DepartmentResponse } from "@/lib/api/school/university/department/response";
import { DepartmentRequest } from "@/lib/api/school/university/department/request";
import FormItemInputText from "@/components/form/input/input-text";
import FormItemSelectSchoolUniversityFaculty from "@/components/form/select/select-school-university-faculty";
import { useEffect, useState } from "react";

export default function FormAddUpdateDepartment(props: {
  isLoading?: boolean;
  item?: DepartmentResponse | null;
  canSubmit?: boolean;
  canSubmitMessage?: string;
  errorMessage?: string;
  onValuesChange?: (values: DepartmentRequest) => void;
  onSubmit?: (data: DepartmentRequest) => void;
  onCancel?: () => void;
}) {
  const [selectedSchoolID, setSelectedSchoolID] = useState<
    number | null | undefined
  >();
  const [form] = Form.useForm();

  const updateFieldValue = (name: string, value?: string) => {
    form.setFields([
      {
        name: name,
        value: value,
      },
    ]);
  };

  useEffect(() => {
    if (props.item?.school?.id != selectedSchoolID) {
      setSelectedSchoolID(props.item?.school?.id);
    }

    return () => {};
  }, [props.item?.school?.id]);

  return (
    <Form<DepartmentRequest>
      form={form}
      name="form-add-update-department"
      layout={"vertical"}
      className="w-full"
      onFinish={props.onSubmit}
      onValuesChange={(changed, values) => {
        if (props.onValuesChange) {
          props.onValuesChange(values);
        }

        const tempSchoolID = changed?.schoolID as string | null | undefined;
        if (
          !values.schoolID ||
          (tempSchoolID && (tempSchoolID?.length ?? 0) > 0)
        ) {
          updateFieldValue("facultyID", undefined);
        }
        if (
          tempSchoolID &&
          (tempSchoolID?.length ?? 0) > 0 &&
          tempSchoolID != selectedSchoolID?.toString()
        ) {
          setSelectedSchoolID(parseInt(tempSchoolID));
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

      <FormItemSelectSchoolUniversityFaculty
        disabled={(selectedSchoolID ?? 0) < 1}
        isLoading={props.isLoading}
        defaultValue={props.item?.faculty?.id?.toString()}
        size="middle"
        schoolID={selectedSchoolID ?? undefined}
        updateFieldValue={updateFieldValue}
      />

      <FormItemInputText
        label="Name"
        name="name"
        placeholder="Enter the department name"
        size="middle"
        isLoading={props.isLoading}
        defaultValue={props.item?.name}
        rules={[
          {
            required: true,
            message: "Please enter the department name!",
          },
        ]}
      />

      <FormItemInputText
        label="Description"
        name="description"
        placeholder="Enter the department description"
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
