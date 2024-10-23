import { Form } from "antd";

type FormLayoutType = Parameters<typeof Form>[0]["layout"];
const defaultFormLayout: FormLayoutType = "vertical";
export default defaultFormLayout;
