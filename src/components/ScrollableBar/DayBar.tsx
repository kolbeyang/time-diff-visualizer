import { times } from "lodash";
import { DateTime } from "luxon";
import { getHourColor } from "./utils";
import { cn } from "@/utils/classNameMerge";

interface Props {
  start: DateTime;
  timezone: string;
  align: "start" | "end";
}

const DayBar = ({ start, timezone, align }: Props) => {
  return (
    <div className="flex flex-1 gap-1">
      {times(24, (i) => {
        const time = start.plus({ hours: i }).setZone(timezone);
        return (
          <div
            className={cn(
              "flex rounded-md overflow-hidden shrink-0 w-[40px]",
              align === "start" ? "flex-col-reverse" : "flex-col",
            )}
          >
            <div
              className={cn(
                "flex-[2] flex flex-col",
                align === "start" ? "justify-start" : "justify-end",
              )}
            >
              <div
                className={cn(
                  "bg-background01",
                  align === "start" ? "rounded-b-md" : "rounded-t-md",
                )}
                style={{ height: "60%" }}
              />
            </div>
            <div className="flex-[3] bg-background01">
              <div
                key={i}
                className={cn(
                  "h-full shrink-0 flex flex-col items-center p-[8px] text-textLight rounded-[4px]",
                  align === "start" ? "justify-start" : "justify-end",
                )}
                style={{ background: getHourColor(time.hour).css() }}
              >
                {time.toFormat("HH")}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DayBar;
