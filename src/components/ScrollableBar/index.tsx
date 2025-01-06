"use client";

import { cn } from "@/utils/classNameMerge";
import { times } from "lodash";
import { DateTime } from "luxon";
import { useMemo } from "react";
import { getDiffDays } from "../utils";
import HourBar from "./HourBar";
import ScrollWrapper from "./ScrollWrapper";
import { awakeByHour } from "./constants";

interface Props {
  timezoneA: string;
  timezoneB: string;
}

const ScrollableBar = ({ timezoneA, timezoneB }: Props) => {
  const start = useMemo(() => {
    return DateTime.now().setZone(timezoneA).startOf("day");
  }, [timezoneA, timezoneB]);
  return (
    <ScrollWrapper className="gap-1 h-[200px] max-w-full items-center flex px-2">
      {times(24, (i) => {
        const time = start.plus({ hours: i });
        const timeA = time.setZone(timezoneA);
        const timeB = time.setZone(timezoneB);
        const isNow =
          timeA.startOf("hour").hour === DateTime.now().startOf("hour").hour;
        const compatibility = awakeByHour[timeA.hour] * awakeByHour[timeB.hour];
        const isToday = getDiffDays(timezoneB, timezoneA, time) === 0;
        return (
          <div key={i} className={cn("flex flex-col gap-1 h-full")}>
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
    </ScrollWrapper>
  );
};

export default ScrollableBar;
