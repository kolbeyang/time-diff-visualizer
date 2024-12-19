import { DateTime } from "luxon";

export const getHourOffset = (timezoneA: string, timezoneB: string) => {
  const timeInZone1 = DateTime.now().setZone(timezoneA);
  const timeInZone2 = DateTime.now().setZone(timezoneB);
  const offsetMinutes = timeInZone2.offset - timeInZone1.offset;
  const offsetHours = offsetMinutes / 60;
  return offsetHours;
};
