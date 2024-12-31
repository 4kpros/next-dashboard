"use client";

import FormModalFooter from "@/components/form/form-modal-footer";
import { Form } from "antd";
import FormAlertDefaultError from "@/components/form/alert/default-error";
import FormAlertDefaultDescription from "@/components/form/alert/default-description";
import FormItemSelectSchool from "@/components/form/select/select-school";
import { SCHOOL_TYPE_HIGHSCHOOL } from "@/lib/constants/school";
import FormItemInputText from "@/components/form/input/input-text";
import { useEffect, useState } from "react";
import { SpecialtyResponse } from "@/lib/api/school/highschool/specialty/response";
import { SpecialtyRequest } from "@/lib/api/school/highschool/specialty/request";
import FormItemSelectSchoolHighschoolSection from "@/components/form/select/select-school-highschool-section";

export default function FormAddUpdateSpecialty(props: {
  isLoading?: boolean;
  item?: SpecialtyResponse | null;
  canSubmit?: boolean;
  canSubmitMessage?: string;
  errorMessage?: string;
  onValuesChange?: (values: SpecialtyRequest) => void;
  onSubmit?: (data: SpecialtyRequest) => void;
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
    <Form<SpecialtyRequest>
      form={form}
      name="form-add-update-specialty"
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
          updateFieldValue("sectionID", undefined);
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
        type={SCHOOL_TYPE_HIGHSCHOOL}
      />

      <FormItemSelectSchoolHighschoolSection
        disabled={(selectedSchoolID ?? 0) < 1}
        isLoading={props.isLoading}
        defaultValue={props.item?.section?.id?.toString()}
        size="middle"
        schoolID={selectedSchoolID ?? undefined}
        updateFieldValue={updateFieldValue}
      />

      <FormItemInputText
        label="Name"
        name="name"
        placeholder="Enter the specialty name"
        size="middle"
        isLoading={props.isLoading}
        defaultValue={props.item?.name}
        rules={[
          {
            required: true,
            message: "Please enter the specialty name!",
          },
        ]}
      />

      <FormItemInputText
        label="Description"
        name="description"
        placeholder="Enter the specialty description"
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
