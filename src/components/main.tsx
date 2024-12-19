"use client";

import { useMemo, useState } from "react";
import TimezonePicker from "./TimezonePicker";
import ScrollableBar from "./ScrollableBar";
import TimeIndicator from "./TimeIndicator";
import { DateTime } from "luxon";
import { getHourOffset } from "./utils";

interface Props {}

const Main = ({}: Props) => {
  const [focusedTime, setFocusedTime] = useState<DateTime>(DateTime.now());
  const [timezoneA, setTimezoneA] = useState("Asia/Seoul");
  const [timezoneB, setTimezoneB] = useState("America/Los_Angeles");

  const hourOffset = useMemo(
    () => getHourOffset(timezoneA, timezoneB),
    [timezoneA, timezoneB],
  );

  return (
    <div className="bg-background text-dark h-screen w-screen flex flex-col items-center justify-between">
      <TimezonePicker value={timezoneA} onChange={setTimezoneA} />
      <TimeIndicator timezone={timezoneA} value={focusedTime} />
      <ScrollableBar hoursOffset={hourOffset} />
      <TimeIndicator timezone={timezoneB} value={focusedTime} />
      <TimezonePicker value={timezoneB} onChange={setTimezoneB} />
    </div>
  );
};

export default Main;
