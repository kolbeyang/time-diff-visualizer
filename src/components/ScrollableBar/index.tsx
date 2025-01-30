"use client";

import { cn } from "@/utils/classNameMerge";
import { times } from "lodash";
import { DateTime } from "luxon";
import { useMemo } from "react";
import { getDiffDays } from "../utils";
import HourBar from "./HourBar";
import { awakeByHour } from "./constants";

interface Props {
  timezoneA: string;
  timezoneB: string;
}

const ScrollableBar = ({ timezoneA, timezoneB }: Props) => {
  const start = useMemo(() => {
    return DateTime.now().setZone(timezoneA).startOf("day");
  }, [timezoneA, timezoneB]);

  const nowInTimezoneA = DateTime.now().setZone(timezoneA);

  return (
    <div className="h-[200px] max-w-full items-center overflow-x-auto scrollbar-hide">
      <div className="flex px-2 gap-[2px] items-center h-full w-fit">
        {times(24, (hours) => {
          const time = start.plus({ hours: hours });
          const timeA = time.setZone(timezoneA);
          const timeB = time.setZone(timezoneB);

          const isNow = hours === nowInTimezoneA.hour;

          const compatibility =
            awakeByHour[timeA.hour] * awakeByHour[timeB.hour];
          const isToday = getDiffDays(timezoneB, timezoneA, time) === 0;
          return (
            <div key={hours} className={cn("flex flex-col gap-[2px] h-full")}>
              <HourBar
                isNow={isNow}
                isToday
                time={time.setZone(timezoneA)}
                compatibility={compatibility}
              />
              <HourBar
                isToday={isToday}
                isNow={isNow}
                isAlignStart
                time={time.setZone(timezoneB)}
                compatibility={compatibility}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScrollableBar;
