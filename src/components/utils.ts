import { DateTime } from "luxon";

export const getHourOffset = (timezoneA: string, timezoneB: string) => {
  const timeInZone1 = DateTime.now().setZone(timezoneA);
  const timeInZone2 = DateTime.now().setZone(timezoneB);
  const offsetMinutes = timeInZone2.offset - timeInZone1.offset;
  const offsetHours = offsetMinutes / 60;
  return offsetHours;
};

export const getDiffDays = (
  timezoneA: string,
  timezoneB: string,
  time: DateTime = DateTime.now(),
) => {
  const startOfDayA = time.setZone(timezoneA).startOf("day");
  const startOfDayB = time.setZone(timezoneB).startOf("day");

  if (startOfDayA.day === startOfDayB.day) {
    return 0;
  }

  if (startOfDayA.diff(startOfDayB, "days").days > 0) {
    return -1;
  } else {
    return 1;
  }
};

// function that takes time and two timezones
// the function returns
