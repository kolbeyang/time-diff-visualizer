import { cn } from "@/utils/classNameMerge";
import { ButtonHTMLAttributes, forwardRef } from "react";

const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  return (
    <button
      className={cn(
        "px-4 py-2 text-dark-5 rounded-md hover:bg-dark/5 active:bg-dark/10",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

export default Button;
