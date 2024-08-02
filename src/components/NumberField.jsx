import React from "react";
import TextField from "@mui/material/TextField";

export default function NumberField(props) {
  return (
    <TextField
      type="number"
      inputMode="decimal"
      pattern="^-?[0-9]+(\.[0-9]*)?$"
      {...props}
    />
  );
}
