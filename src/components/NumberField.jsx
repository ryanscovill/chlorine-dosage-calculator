import React from "react";
import { TextField } from "@material-ui/core";

export default function NumberField(props) {
  return (
    <TextField
      type="tel"
      pattern="^-?[0-9]\d*\.?\d*$"
      {...props}
    />
  );
}
