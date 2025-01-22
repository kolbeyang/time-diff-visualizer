import { cn } from "@/utils/classNameMerge";
import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  continent: string;
  isSelected?: boolean;
}

const ContinentButton = ({
  continent,
  isSelected = false,
  ...props
}: Props) => {
  return (
    <button
      className={cn("text-dark-5 text-base px-[10px] py-[4px] rounded-lg", {
        "bg-dark-5/10 hover:bg-dark-5/20": !isSelected,
        "bg-primary hover:bg-primary/80 text-light-5": isSelected,
      })}
      {...props}
    >
      {continent}
    </button>
  );
};

export default ContinentButton;
