"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useMemo, useState } from "react";

interface Props {
  value: string;
  onChange: (timezone: string) => void;
}

const TimezonePicker = ({ value, onChange }: Props) => {
  const [searchValue, setSearchValue] = useState("");

  const filteredTimezones = useMemo(
    () =>
      Intl.supportedValuesOf("timeZone").filter((timezone) =>
        timezone.toLowerCase().includes(searchValue.toLowerCase()),
      ),
    [searchValue],
  );

  return (
    <Dialog onOpenChange={() => setSearchValue("")}>
      <DialogTrigger asChild>
        <button className="text-xl font-bold text-dark01 text-center">
          {value}
        </button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="" />
        <DialogContent className="size-full bg-background fixed top-0 left-0 flex flex-col items-center">
          <VisuallyHidden>
            <DialogTitle>Select timezone</DialogTitle>
          </VisuallyHidden>
          <div className="flex flex-col max-w-[500px] w-full py-[28px] px-[24px] h-full gap-2">
            <DialogClose asChild>
              <button className="text-dark text-xl" aria-label="Close">
                Close
              </button>
            </DialogClose>
            <input
              autoFocus
              value={searchValue}
              className="w-full bg-background01 outline-none py-[8px] px-[20px] text-2xl rounded-lg text-dark"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search timezone"
            />
            <div className="flex-1 flex flex-col gap-2 w-full overflow-auto">
              {filteredTimezones.map((timezone: string) => (
                <DialogClose
                  asChild
                  onClick={() => onChange(timezone)}
                  key={timezone}
                >
                  <div className="text-dark text-xl rounded-md hover:bg-textLight">
                    {timezone}
                  </div>
                </DialogClose>
              ))}
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default TimezonePicker;
