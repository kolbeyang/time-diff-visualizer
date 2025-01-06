import { clamp } from "lodash";
import { awakeByHour } from "./constants";
import { scale } from "chroma-js";
import colors from "../../../colors";

export const getHourColor = (hour: number) => {
  const awakePercentage = awakeByHour[clamp(hour, 0, 23)];
  const colorScale =
    hour < 12
      ? scale([colors.amNight, colors.amDay])
      : scale([colors.pmNight, colors.pmDay]);

  return colorScale(awakePercentage);
};
