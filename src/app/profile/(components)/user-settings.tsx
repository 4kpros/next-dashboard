import { theme as antdTheme, Switch } from "antd";

export default function UserSettings(props: {
  isLoading?: boolean;
  isNotificationsEnabled?: boolean;
  is2FAEnabled?: boolean;
  onToggleNotifications?: (checked: boolean) => void;
  onToggle2FA?: (checked: boolean) => void;
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
          <h3 className="text-lg leading-6 font-medium">Settings</h3>
          <p className="mt-1 max-w-2xl text-sm opacity-75">
            Information about 2FA, Permissions and role.
          </p>
        </div>
      </div>
      <div className="px-4 py-5 sm:p-0">
        <dl className="">
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-t">
            <dt className="text-sm font-medium  opacity-75">Notifications</dt>
            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2 text-right">
              <Switch
                loading={props.isLoading}
                defaultValue={false}
                value={props.isNotificationsEnabled}
                onClick={props.onToggleNotifications}
              />
            </dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-t">
            <dt className="text-sm font-medium  opacity-75">2FA</dt>
            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2 text-right">
              <Switch
                loading={props.isLoading}
                defaultValue={false}
                value={props.is2FAEnabled}
                onClick={props.onToggle2FA}
              />
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
