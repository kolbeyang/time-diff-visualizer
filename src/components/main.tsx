"use client";

import { DateTime } from "luxon";
import { createContext, useEffect, useMemo, useState } from "react";
import ScrollableBar from "./ScrollableBar";
import TimeIndicator from "./TimeIndicator";
import TimezonePicker from "./TimezonePicker";
import { getDiffDays } from "./utils";
import useDocumentHeight from "@/hooks/useDocumentHeight";

interface AppState {
  is24HourFormat: boolean;
}

const defaultAppState: AppState = {
  is24HourFormat: true,
};

interface AppContextValue extends AppState {
  setState: (state: AppState) => void;
}

export const AppContext = createContext<AppContextValue>({
  ...defaultAppState,
  setState: () => {},
});

const Main = () => {
  const [timezoneA, setTimezoneA] = useState("Asia/Seoul");
  const [timezoneB, setTimezoneB] = useState("America/New_York");
  const [appState, setAppState] = useState(defaultAppState);

  const [currentTime, setCurrentTime] = useState(DateTime.now());
  const docHeight = useDocumentHeight();

  const diffDays = useMemo(
    () => getDiffDays(timezoneA, timezoneB),
    [timezoneA, timezoneB, currentTime],
  );

  useEffect(() => {
    const updateTime = () => setCurrentTime(DateTime.now());
    const now = DateTime.now();
    const nextMinute = now.plus({ minutes: 1 }).startOf("minute");
    const millisecondsUntilNextMinute = nextMinute.diff(
      now,
      "milliseconds",
    ).milliseconds;

    const timeoutId = setTimeout(() => {
      updateTime();
      const intervalId = setInterval(updateTime, 60000);
      return () => clearInterval(intervalId);
    }, millisecondsUntilNextMinute);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <AppContext.Provider value={{ ...appState, setState: setAppState }}>
      <div
        className="bg-light-5 text-dark-5 w-screen flex flex-col items-center justify-between py-7 h-screen"
        style={docHeight ? { height: docHeight } : {}}
      >
        <TimezonePicker value={timezoneA} onChange={setTimezoneA} />
        <TimeIndicator timezone={timezoneA} value={currentTime} diffDays={0} />
        <ScrollableBar timezoneA={timezoneA} timezoneB={timezoneB} />
        <TimeIndicator
          timezone={timezoneB}
          value={currentTime}
          diffDays={diffDays}
        />
        <TimezonePicker value={timezoneB} onChange={setTimezoneB} />
      </div>
    </AppContext.Provider>
  );
};

export default Main;
