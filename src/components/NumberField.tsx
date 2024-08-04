import React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";

interface NumberFieldProps extends Omit<TextFieldProps, 'pattern'> {
  pattern?: string;
}

const NumberField: React.FC<NumberFieldProps> = (props) => {
  return (
    <TextField
      type="number"
      inputMode="decimal"
      pattern="^-?[0-9]+(\.[0-9]*)?$"
      {...props}
    />
  );
};

export default NumberField;
