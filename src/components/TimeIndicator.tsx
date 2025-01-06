import { DateTime } from "luxon";
import { useContext } from "react";
import { AppContext } from "./main";

interface Props {
  value: DateTime;
  timezone: string;
  diffDays: number;
}

const TimeIndicator = ({ value, timezone, diffDays }: Props) => {
  const timeInTimezone = value.setZone(timezone);
  const { is24HourFormat } = useContext(AppContext);
  const relativeDay = (() => {
    if (diffDays === 1) return "Tomorrow";
    if (diffDays === -1) return "Yesterday";
    return "Today";
  })();

  return (
    <div className="flex flex-col gap-2 items-center">
      <span className="text-sm font-bold">{relativeDay}</span>
      <div className="flex gap-1.5 items-center">
        <div className="text-[48px] leading-[48px] font-black">
          {timeInTimezone.toFormat(is24HourFormat ? "HH" : "hh")}
        </div>
        <div className="flex flex-col">
          <div className="text-[16px] leading-[16px] font-black">
            :{timeInTimezone.toFormat("mm")}
          </div>
          {!is24HourFormat && (
            <div className="text-[16px] leading-[16px] font-black">
              {timeInTimezone.toFormat("a").toLowerCase()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeIndicator;
