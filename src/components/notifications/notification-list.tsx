import { NotificationListResponse } from "@/lib/api/notifications/response";
import React from "react";
import ModalInfoFooter from "../form/modal-info-footer";

export default function NotificationList(props: {
  items?: NotificationListResponse;
  onClose?: () => void;
}) {
  return (
    <div className="mt-4">
      <ModalInfoFooter onClose={props.onClose} />
    </div>
  );
}
