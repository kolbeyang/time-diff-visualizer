import { hourWidth } from "./constants";
import DayBar from "./DayBar";

interface Props {
  hoursOffset: number;
}

const ScrollableBar = ({ hoursOffset }: Props) => {
  return (
    // TODO: hide the scrollbar
    <div className="bg-green-200 w-full overflow-x-scroll">
      <div className="h-[100px] relative">
        <DayBar className="absolute h-1/2 top-0" />
        <DayBar
          className="absolute h-1/2 bottom-0"
          style={{ left: hourWidth * hoursOffset }}
        />
      </div>
    </div>
  );
};

export default ScrollableBar;
