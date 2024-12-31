"use client";

import { getDashboardPath } from "@/lib/links/dashboard";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, theme as antdTheme, message } from "antd";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import UserProfile from "./(components)/user-profile";
import UserSettings from "./(components)/user-settings";
import CustomModalWithoutFooter from "@/components/modal/custom-without-footer";
import FormUpdateProfileInfo from "./(components)/form-update-profile-info";
import { useState } from "react";
import { CustomContainerMd } from "@/components/container/custom-container";
import DashboardIcon from "@/components/icons/material/dashboard";
import { getProfile, updateProfile } from "@/lib/api/user/profile/routes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ProfileRequest } from "@/lib/api/user/profile/request";
import { NoticeType } from "antd/es/message/interface";

export default function PageContent() {
  // React hooks
  const router = useRouter();
  // Update profile states
  const [updateProfileModalOpen, setUpdateProfileModalOpen] = useState(false);
  const [canSubmitUpdate, setCanSubmitUpdate] = useState(false);

  // Ant design hooks
  const { useToken } = antdTheme;
  const { token: theme } = useToken();
  const [messageApi] = message.useMessage();
  const toastMessage = (type: NoticeType, message: string) => {
    messageApi.open({
      type: type,
      content: message,
    });
  };

  // Next hooks
  const session = useSession();

  // Tanstack hooks
  const queryClient = useQueryClient();
  const queryKeyData = "profile-data";
  const query = useQuery({
    queryKey: [queryKeyData],
    queryFn: async () => getProfile(),
  });
  const mutationUpdate = useMutation({
    mutationFn: async (profile: ProfileRequest) => updateProfile(profile),
    onSuccess(_data, _variables, _context) {
      setCanSubmitUpdate(false);
      invalidateQueries();
      toastMessage("success", "Successful updated!");
    },
    onError(_error, _variables, _context) {
      console.log(_error);
      toastMessage("error", "Failed to update profile!");
    },
  });
  const invalidateQueries = () => {
    queryClient.invalidateQueries({
      queryKey: [queryKeyData],
    });
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
            }}
            className="w-full background-pattern-white-low"
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
                onClick={() =>
                  router.push(
                    getDashboardPath(session?.data?.user?.feature ?? "")
                  )
                }
                icon={<DashboardIcon />}
              >
                Dashboard
              </Button>
            </div>
            <div className="w-full flex flex-col items-center justify-center gap-4 my-4">
              <Image
                style={{
                  backgroundColor: theme.colorBgContainer,
                }}
                src={
                  session.data?.user?.image ??
                  "/images/common/avatar.png"
                }
                width={256}
                height={256}
                alt={""}
                className="w-32 h-32 object-cover rounded-full shadow-md"
              />
              <div
                style={{
                  color: "#fff",
                }}
                className="w-full flex flex-col items-center justify-center"
              >
                <h3 className="text-2xl font-semibold leading-normal">
                  {query.data?.data?.info?.firstName}{" "}
                  {query.data?.data?.info?.lastName}
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
                isLoading={query.isFetching}
                item={query.data?.data ?? undefined}
                onClickEdit={() => setUpdateProfileModalOpen(true)}
              />
            </div>
            <div
              style={{
                borderRadius: theme.borderRadius,
              }}
              className="w-full h-full flex flex-col border"
            >
              <UserSettings
                isLoading={query.isFetching}
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
            isLoading={query.isPending}
            canSubmit={canSubmitUpdate}
            profile={query.data?.data ?? undefined}
            onValuesChange={(values) => {
              setCanSubmitUpdate(
                !(
                  query.data?.data?.info?.firstName === values?.firstName &&
                  query.data?.data?.info?.lastName === values?.lastName &&
                  query.data?.data?.info?.birthday === values?.birthday &&
                  query.data?.data?.info?.birthLocation ===
                    values?.birthLocation &&
                  query.data?.data?.info?.address === values?.address &&
                  query.data?.data?.info?.language === values?.language
                )
              );
            }}
            onSubmit={(values) => {
              mutationUpdate.mutate(values);
              setUpdateProfileModalOpen(false);
            }}
            onCancel={() => setUpdateProfileModalOpen(false)}
          />
        }
        modalOpen={updateProfileModalOpen}
        onOk={() => setUpdateProfileModalOpen(false)}
        onCancel={() => setUpdateProfileModalOpen(false)}
        maskClosable={false}
      />
    </>
  );
}
