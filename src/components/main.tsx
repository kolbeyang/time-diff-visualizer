"use client";

import { DateTime } from "luxon";
import { createContext, useEffect, useMemo, useState } from "react";
import ScrollableBar from "./ScrollableBar";
import TimeIndicator from "./TimeIndicator";
import TimezonePicker from "./TimezonePicker";
import { getDiffDays } from "./utils";

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
  const [timezoneA, setTimezoneA] = useState("America/Los_Angeles");
  const [timezoneB, setTimezoneB] = useState("Asia/Seoul");
  const [appState, setAppState] = useState(defaultAppState);

  const [currentTime, setCurrentTime] = useState(DateTime.now());

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
      <div className="bg-background text-dark h-screen w-screen flex flex-col items-center justify-between py-7">
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
