import FormModalFooter from "@/components/form/form-modal-footer";
import { SchoolRequest } from "@/lib/api/school/school/request";
import { SchoolResponse } from "@/lib/api/school/school/response";
import { Divider, Form } from "antd";
import FormAlertDefaultError from "@/components/form/alert/default-error";
import FormAlertDefaultDescription from "@/components/form/alert/default-description";
import FormItemDateTime from "@/components/form/date/date";
import FormItemInputText from "@/components/form/input/input-text";
import FormItemSelectSchoolType from "@/components/form/select/select-school-type";
import FormItemInputEmailDomain from "@/components/form/input/input-email-domain";
import dayjs from "dayjs";
import FormItemInputPhone from "@/components/form/input/input-phone";
import FormItemInputEmail from "@/components/form/input/input-email";

export default function FormAddUpdateSchool(props: {
  isLoading?: boolean;
  item?: SchoolResponse | null;
  canSubmit?: boolean;
  canSubmitMessage?: string;
  errorMessage?: string;
  onValuesChange?: (values: SchoolRequest) => void;
  onSubmit: (data: SchoolRequest) => void;
  onCancel: () => void;
}) {
  return (
    <Form<SchoolRequest>
      name="form-add-update-school"
      layout={"vertical"}
      className="w-full"
      onFinish={props.onSubmit}
      onValuesChange={(_changed, values) => {
        if (props.onValuesChange) {
          props.onValuesChange(values)
        };
      }}
      autoComplete="on"
    >
      <br />
      <FormItemInputText
        label="Name"
        name="name"
        placeholder="Enter the school name"
        size="middle"
        isLoading={props.isLoading}
        defaultValue={props.item?.name ?? undefined}
        rules={[
          {
            required: true,
            message: "Please enter the school name!",
          },
        ]}
      />

      <FormItemSelectSchoolType
        isLoading={props.isLoading}
        defaultValue={props.item?.type ?? undefined}
        size="middle"
      />
      <br />
      <Divider plain>Config</Divider>
      <FormItemInputEmailDomain
        isLoading={props.isLoading}
        required={false}
        size="middle"
        name={["config", "emailDomain"]}
      />
      <br />
      <Divider plain>Info</Divider>
      <FormItemInputText
        label="Full name"
        name={["info", "fullName"]}
        placeholder="Enter the full name"
        size="middle"
        isLoading={props.isLoading}
        defaultValue={props.item?.info?.fullName ?? undefined}
        rules={[
          {
            required: true,
            message: "Please enter the full name!"
          },
        ]}
      />
      <FormItemInputText
        label="Description"
        name={["info", "description"]}
        placeholder="Enter the description"
        size="middle"
        isLoading={props.isLoading}
        defaultValue={props.item?.info?.description ?? undefined}
        rules={[
          {
            required: false,
          },
        ]}
      />
      <FormItemInputText
        label="Slogan"
        name={["info", "slogan"]}
        placeholder="Enter the slogan"
        size="middle"
        isLoading={props.isLoading}
        defaultValue={props.item?.info?.slogan ?? undefined}
        rules={[
          {
            required: false,
          },
        ]}
      />
      <FormItemInputText
        label="Founder"
        name={["info", "founder"]}
        placeholder="Enter the founder"
        size="middle"
        isLoading={props.isLoading}
        defaultValue={props.item?.info?.founder ?? undefined}
        rules={[
          {
            required: false,
          },
        ]}
      />
      <FormItemDateTime
        label="Founded at"
        name={["info", "foundedAt"]}
        size="middle"
        isLoading={props.isLoading}
        defaultValue={props.item?.info?.foundedAt ? dayjs(props.item?.info?.foundedAt?.toString()) : undefined}
      />
      <FormItemInputText
        label="Address"
        name={["info", "address"]}
        placeholder="Enter the address"
        size="middle"
        isLoading={props.isLoading}
        defaultValue={props.item?.info?.address ?? undefined}
        rules={[
          {
            required: false,
          },
        ]}
      />
      <FormItemInputText
        label="Location longitude"
        name={["info", "locationLongitude"]}
        placeholder="Enter the location longitude"
        size="middle"
        isLoading={props.isLoading}
        defaultValue={props.item?.info?.locationLongitude ?? undefined}
        rules={[
          {
            required: false,
          },
        ]}
      />
      <FormItemInputText
        label="Location latitude"
        name={["info", "locationLatitude"]}
        placeholder="Enter the location latitude"
        size="middle"
        isLoading={props.isLoading}
        defaultValue={props.item?.info?.locationLatitude ?? undefined}
        rules={[
          {
            required: false,
          },
        ]}
      />

      <FormItemInputEmail
        label="Email 1"
        name={["info", "email1"]}
        isLoading={props.isLoading}
        defaultValue={props.item?.info?.email1 ?? undefined}
        required={false}
        size="middle"
      />
      <FormItemInputEmail
        label="Email 2"
        name={["info", "email2"]}
        isLoading={props.isLoading}
        defaultValue={props.item?.info?.email2 ?? undefined}
        required={false}
        size="middle"
      />
      <FormItemInputEmail
        label="Email 3"
        name={["info", "email3"]}
        isLoading={props.isLoading}
        defaultValue={props.item?.info?.email3 ?? undefined}
        required={false}
        size="middle"
      />

      <FormItemInputPhone
        label="Phone number 1"
        name={["info", "phoneNumber1"]}
        isLoading={props.isLoading}
        defaultValue={props.item?.info?.phoneNumber1?.toString() ?? undefined}
        required={false}
        size="middle"
      />
      <FormItemInputPhone
        label="Phone number 2"
        name={["info", "phoneNumber2"]}
        isLoading={props.isLoading}
        defaultValue={props.item?.info?.phoneNumber2?.toString() ?? undefined}
        required={false}
        size="middle"
      />
      <FormItemInputPhone
        label="Phone number 3"
        name={["info", "phoneNumber3"]}
        isLoading={props.isLoading}
        defaultValue={props.item?.info?.phoneNumber3?.toString() ?? undefined}
        required={false}
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
