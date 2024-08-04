import React from "react";
import NumberField from "./NumberField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material/Select";
import Unit from "../models/unit.model";

interface InputSelectProps {
  units: Unit[];
  value: string | number;
  factor: number;
  onSelectChange: (value: number) => void;
  onInputChange?: (value: string) => void;
  [key: string]: any;
}

const InputSelect: React.FC<InputSelectProps> = ({
  units,
  value,
  factor,
  onSelectChange,
  onInputChange,
  ...otherProps
}) => {

  const handleSelectChange = (e: SelectChangeEvent<number>) => {
    onSelectChange(e.target.value as number);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(e.target.value))) {
      return;
    }
    if(onInputChange) {
      onInputChange(e.target.value);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <NumberField {...otherProps} value={value} onChange={handleInputChange} />
      <Select displayEmpty value={factor} onChange={handleSelectChange}>
        {units.map((unit) => (
          <MenuItem key={unit.name} value={unit.factor}>{unit.name}</MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default InputSelect;