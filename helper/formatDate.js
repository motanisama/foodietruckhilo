import { format } from "date-fns";

export function convertTime(HHmm) {
  const newDate = new Date(`01/01/1970 ${HHmm}`);
  const formatted = newDate && format(newDate, "hh:mm a");
  return formatted;
}
