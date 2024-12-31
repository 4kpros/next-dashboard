import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const DATE_FORMAT = "YYYY-MM-DD";

export function parseDateTime(date?: string) {
  return dayjs(date).toDate();
}

export function formatDateTime(date?: string) {
  return dayjs(date).format("dddd, D MMMM YYYY HH:mm:ss UTC Z").toString();
}

export function formatDate(date?: string) {
  return dayjs(date).format(DATE_FORMAT).toString();
}

export function formatDateTimeToSince(date?: string) {
  return dayjs(date).fromNow().toString();
}
