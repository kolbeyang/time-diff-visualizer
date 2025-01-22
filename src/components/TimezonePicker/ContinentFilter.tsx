import ContinentButton from "./ContinentButton";

interface Props {
  value: string | null;
  options: string[];
  onChange: (newValue: string | null) => void;
}

const ContinentFilter = ({ value, options, onChange }: Props) => {
  return (
    <div className="flex gap-1 w-full overflow-x-scroll scrollbar-hide">
      {options.map((continent) => {
        const isSelected = value === continent;
        return (
          <ContinentButton
            key={continent}
            continent={continent}
            isSelected={isSelected}
            onClick={() => (isSelected ? onChange(null) : onChange(continent))}
          />
        );
      })}
    </div>
  );
};

export default ContinentFilter;
