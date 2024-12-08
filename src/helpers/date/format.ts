import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function formatDateTime(date?: string) {
  return dayjs(date).format("dddd, D MMMM YYYY HH:mm:ss UTC Z").toString();
}

export function formatDateTimeToSince(date?: string) {
  return dayjs(date).fromNow().toString();
}
