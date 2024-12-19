"use client";

interface Props {
  value: string;
  onChange: (timezone: string) => void;
}

const TimezonePicker = ({ value, onChange }: Props) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {Intl.supportedValuesOf("timeZone").map((timezone: string) => (
        <option key={timezone}>{timezone}</option>
      ))}
    </select>
  );
};

export default TimezonePicker;
