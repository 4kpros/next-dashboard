import { EditOutlined } from "@ant-design/icons";
import { theme as antdTheme, Button } from "antd";

export default function UserProfile(props: {
  isLoading?: boolean;
  onClickEdit?: () => void;
}) {
  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  return (
    <div className="w-full">
      <div
        style={{
          backgroundColor: theme.colorPrimaryBg,
          borderTopLeftRadius: theme.borderRadius,
          borderTopRightRadius: theme.borderRadius,
        }}
        className="w-full flex flex-wrap justify-between p-4 gap-4"
      >
        <div className="">
          <h3 className="text-lg leading-6 font-medium">Profile</h3>
          <p className="mt-1 max-w-2xl text-sm opacity-75">
            This is some information about the user.
          </p>
        </div>
        <Button
          loading={props.isLoading}
          htmlType="submit"
          onClick={props.onClickEdit}
          icon={<EditOutlined />}
        >
          Edit
        </Button>
      </div>
      <div className="px-4 py-5 sm:p-0">
        <dl className="">
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-t">
            <dt className="text-sm font-medium  opacity-75">Full name</dt>
            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">John Doe</dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-t">
            <dt className="text-sm font-medium  opacity-75">Email address</dt>
            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
              johndoe@example.com
            </dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-t">
            <dt className="text-sm font-medium  opacity-75">Phone number</dt>
            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
              (123) 456-7890
            </dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-t">
            <dt className="text-sm font-medium  opacity-75">Address</dt>
            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
              123 Main St
              <br />
              Anytown, USA 12345
            </dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-t">
            <dt className="text-sm font-medium  opacity-75">Birth</dt>
            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
              15-10-2002 at Cameroon
            </dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-t">
            <dt className="text-sm font-medium  opacity-75">Language</dt>
            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">English</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}