import React from "react";
import { TextField } from "@material-ui/core";

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
