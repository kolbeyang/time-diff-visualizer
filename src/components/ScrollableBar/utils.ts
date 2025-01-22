import { clamp } from "lodash";
import { awakeByHour } from "./constants";
import { scale } from "chroma-js";
import colors from "../../../colors";

export const getHourColor = (hour: number) => {
  const awakePercentage = awakeByHour[clamp(hour, 0, 23)];
  const colorScale =
    hour < 12
      ? scale([colors["am-dark"], colors["am-light"]])
      : scale([colors["pm-dark"], colors["pm-light"]]);

  return colorScale(awakePercentage);
};
