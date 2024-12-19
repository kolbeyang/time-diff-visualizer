import { DateTime } from "luxon";

interface Props {
  value: DateTime;
  timezone: string;
}

const TimeIndicator = ({ value, timezone }: Props) => {
  const timeInTimezone = value.setZone(timezone);
  return <div className="flex">{timeInTimezone.toFormat("HH:mm a")}</div>;
};

export default TimeIndicator;
