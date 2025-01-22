import { cn } from "@/utils/classNameMerge";
import { getHourColor } from "./utils";
import { DateTime } from "luxon";
import { useContext } from "react";
import { AppContext } from "../main";

interface Props {
  isAlignStart?: boolean;
  time: DateTime;
  compatibility: number; // 0 - 1
  isToday?: boolean;
  isNow?: boolean;
}

const colorHeightPercentage = 60;

const HourBar = ({
  isAlignStart = false,
  time,
  compatibility,
  isToday = false,
  isNow = false,
}: Props) => {
  const { is24HourFormat } = useContext(AppContext);

  const isStartHour = time.hour === 0;
  const isEndHour = time.hour === 23;

  const compatibilityHeightPercentage =
    colorHeightPercentage + (100 - colorHeightPercentage) * compatibility;

  const relativeColorHeightPercentage =
    (colorHeightPercentage / compatibilityHeightPercentage) * 100;

  const justifyClassName = isAlignStart ? "justify-start" : "justify-end";

  return (
    <div
      className={cn(
        "flex-1 flex flex-col overflow-hidden shrink-0 w-[40px]",
        justifyClassName,
      )}
    >
      <div
        className={cn(
          "bg-light-4 w-full flex flex-col rounded-md",
          justifyClassName,
          {
            "rounded-r-3xl": isEndHour,
            "rounded-l-3xl": isStartHour,
          },
        )}
        style={{ height: `${compatibilityHeightPercentage}%` }}
      >
        <div
          className={cn(
            "text-light-5 flex flex-col items-center p-2 rounded-md leading-4",
            justifyClassName,
            {
              "rounded-r-3xl": isEndHour,
              "rounded-l-3xl": isStartHour,
              "opacity-40": !isToday,
              "border-[3px] border-highlight": isNow,
            },
          )}
          style={{
            background: getHourColor(time.hour).css(),
            height: `${relativeColorHeightPercentage}%`,
          }}
        >
          <div>{time.toFormat(is24HourFormat ? "HH" : "hh")}</div>
          {time.minute !== 0 && (
            <div className="opacity-50">{time.toFormat("mm")}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HourBar;
