import React from "react";

export default function UserSettings() {
  return (
    <div className="w-full">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium">Settings</h3>
        <p className="mt-1 max-w-2xl text-sm opacity-75">
          Information about 2FA, Permissions and role.
        </p>
      </div>
      <div className="border-t border px-4 py-5 sm:p-0">
        <dl className="sm:divide-y">
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium  opacity-75">Role</dt>
            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">Admin</dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium  opacity-75">2FA</dt>
            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">Disabled</dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium  opacity-75">Notifications</dt>
            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">Disabled</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
