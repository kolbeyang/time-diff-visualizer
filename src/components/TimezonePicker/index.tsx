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
import Button from "../ui/Button";
import ContinentFilter from "./ContinentFilter";
import { compact, map, uniq } from "lodash";
import fuzzysort from "fuzzysort";

interface Props {
  value: string;
  onChange: (timezone: string) => void;
}

const TimezonePicker = ({ value, onChange }: Props) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedContinent, setSelectedContinent] = useState<string | null>(
    null,
  );

  const timezones = Intl.supportedValuesOf("timeZone");

  const continents = useMemo(() => {
    const continentsWithDuplicates = timezones.map((timezone) =>
      timezone.split("/").at(0),
    );
    return uniq(compact(continentsWithDuplicates));
  }, []);

  const filteredTimezones = useMemo(() => {
    const timezonesInContinent = timezones.filter(
      (timezone) =>
        selectedContinent === null || timezone.includes(selectedContinent),
    );

    const fuzzyResults = fuzzysort.go(searchValue, timezonesInContinent, {
      all: true,
    });

    console.log(fuzzyResults);

    return map(fuzzyResults, "target");
  }, [searchValue, selectedContinent]);

  return (
    <Dialog onOpenChange={() => setSearchValue("")}>
      <DialogTrigger asChild>
        <Button className="text-xl font-bold text-dark-4 text-center">
          {value}
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="" />
        <DialogContent className="size-full bg-light-5 fixed top-0 left-0 flex flex-col items-center">
          <VisuallyHidden>
            <DialogTitle>Select timezone</DialogTitle>
          </VisuallyHidden>
          <div className="flex flex-col max-w-[500px] w-full py-[28px] px-[24px] h-full gap-2">
            <DialogClose asChild>
              <Button className="text-dark-5 text-xl" aria-label="Close">
                Close
              </Button>
            </DialogClose>
            <input
              autoFocus
              value={searchValue}
              className="w-full bg-light-4 outline-none py-[8px] px-[20px] text-2xl rounded-lg text-dark-5"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search timezone"
            />
            <ContinentFilter
              value={selectedContinent}
              options={continents}
              onChange={(value) => setSelectedContinent(value)}
            />
            <div className="flex-1 flex flex-col gap-2 w-full overflow-auto">
              {filteredTimezones.map((timezone: string) => (
                <DialogClose
                  asChild
                  onClick={() => onChange(timezone)}
                  key={timezone}
                >
                  <div className="text-dark-5 text-xl rounded-md hover:bg-light-5">
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
