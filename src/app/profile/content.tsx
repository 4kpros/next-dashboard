"use client";

import { getDashboardPath } from "@/lib/links/dashboard";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, theme as antdTheme } from "antd";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import UserProfile from "./(components)/user-profile";
import UserSettings from "./(components)/user-settings";
import CustomModalWithoutFooter from "@/components/modal/custom-without-footer";
import FormUpdateProfileInfo from "./(components)/form-update-profile-info";
import { useState } from "react";
import { CustomContainerMd } from "@/components/container/custom-container";
import DashboardIcon from "@/components/icons/lucide/dashboard";

export default function PageContent() {
  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  // React hooks
  const router = useRouter();
  const [updateInfoModalOpen, setUpdateInfoModalOpen] = useState(false);

  // Next hooks
  const session = useSession();

  const action = () => {
    if (session.status == "authenticated") {
      router.push(getDashboardPath(session?.data?.user?.feature ?? ""));
    }
  };

  return (
    <>
      <CustomContainerMd>
        <div
          style={{
            backgroundColor: theme.colorBgContainer,
            borderRadius: theme.borderRadius,
          }}
          className="w-full h-full flex flex-col gap-6 items-center border my-6"
        >
          <div
            style={{
              backgroundColor: theme.colorPrimary,
              borderTopLeftRadius: theme.borderRadius,
              borderTopRightRadius: theme.borderRadius,
              backgroundImage:
                "radial-gradient(#ffffff4f 1.25px, transparent 1.25px)",
              backgroundSize: "25px 25px",
            }}
            className="w-full"
          >
            <div className="w-full flex flex-wrap justify-between gap-4 p-4">
              <Button
                onClick={() => router.push("/")}
                icon={<ArrowLeftOutlined />}
              >
                Go to website
              </Button>
              <Button
                htmlType="submit"
                onClick={action}
                icon={<DashboardIcon width={20} height={20} />}
              >
                Dashboard
              </Button>
            </div>
            <div className="w-full flex flex-col items-center justify-center gap-4 my-4">
              <Image
                style={{
                  backgroundColor: theme.colorWhite,
                }}
                src={"/images/pages/auth/register.jpg"}
                width={256}
                height={256}
                alt={""}
                className="w-32 h-32 object-cover rounded-full ring-4 ring-gray-400"
              />
              <div
                style={{
                  color: "#fff",
                }}
                className="w-full flex flex-col items-center justify-center"
              >
                <h3 className="text-2xl font-semibold leading-normal">
                  John Doe
                </h3>
                <p className="text-lg leading-normal opacity-75">
                  {session.status == "loading"
                    ? "..."
                    : session.data?.user?.role ?? "..."}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-4 px-4 mb-4">
            <div
              style={{
                borderRadius: theme.borderRadius,
              }}
              className="w-full h-full flex flex-col border"
            >
              <UserProfile
                isLoading={false}
                onClickEdit={() => setUpdateInfoModalOpen(true)}
              />
            </div>
            <div
              style={{
                borderRadius: theme.borderRadius,
              }}
              className="w-full h-full flex flex-col border"
            >
              <UserSettings
                isLoading={false}
                isNotificationsEnabled={false}
                is2FAEnabled={false}
                onToggleNotifications={(isChecked) => {
                  // TODO
                }}
                onToggle2FA={(isChecked) => {
                  // TODO
                }}
              />
            </div>
          </div>
        </div>
      </CustomContainerMd>

      {/* Update info */}
      <CustomModalWithoutFooter
        title="Update profile"
        content={
          <FormUpdateProfileInfo
            onSubmit={() => setUpdateInfoModalOpen(false)}
            onCancel={() => setUpdateInfoModalOpen(false)}
          />
        }
        modalOpen={updateInfoModalOpen}
        onOk={() => setUpdateInfoModalOpen(false)}
        onCancel={() => setUpdateInfoModalOpen(false)}
        maskClosable={false}
      />
    </>
  );
}
