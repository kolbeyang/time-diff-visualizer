import { times } from "lodash";
import { awakeByHour, hourWidth } from "./constants";
import { cn } from "@/utils/classNameMerge";
import { CSSProperties } from "react";

interface Props {
  className?: string;
  style?: CSSProperties;
}

const DayBar = ({ className, style }: Props) => {
  return (
    <div
      className={cn("flex flex-row h-[30px]", className)}
      style={{ width: hourWidth * 24, ...style }}
    >
      {times(24, (i) => (
        <div
          key={i}
          className="flex-1 bg-red-300 border border-white"
          style={{ height: `${50 + 50 * awakeByHour[i]}%` }}
        />
      ))}
    </div>
  );
};

export default DayBar;
