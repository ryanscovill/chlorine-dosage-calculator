import React, { useReducer, useImperativeHandle, forwardRef } from "react";
import { Grid, InputAdornment, Typography } from "@mui/material";
import InputSelect from "./InputSelect";
import { lengthUnits, volumeUnits } from "../models/unit.model";

interface State {
  length: string;
  lengthFactor: number;
  diameter: string;
  diameterFactor: number;
  volume: number;
  volumeFactor: number;
  isFormReset: boolean;
}

type Action =
  | { type: 'SET_FIELD', field: keyof State, value: string | number }
  | { type: 'RESET' };

const initialState: State = { length: '', lengthFactor: 1, diameter: '', diameterFactor: 1, volume: 0, volumeFactor: 1, isFormReset: true };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_FIELD':
      const newState = { ...state, [action.field]: action.value, isFormReset: false };
      return { ...newState, volume: calculateVolume(newState) };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

const calculateVolume = (s: State): number => {
    const length = parseFloat(s.length) / s.lengthFactor;
    const diameter = parseFloat(s.diameter) / s.diameterFactor;
    if (isNaN(length) || isNaN(diameter)) {
        return 0;
    }
    return parseFloat((Math.PI * Math.pow(diameter / 2, 2) * length).toFixed(4));
};

interface PipeVolumeFormProps {
  onFormResetChange?: (isReset: boolean) => void;
}

const PipeVolumeForm = forwardRef(({ onFormResetChange = () => {} }: PipeVolumeFormProps, ref) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useImperativeHandle(ref, () => ({
    reset: () => {
      dispatch({ type: 'RESET' });
    }
  }));

  React.useEffect(() => {
    onFormResetChange(state.isFormReset);
  }, [state.isFormReset, onFormResetChange]);

  return (
    <form noValidate autoComplete="off">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InputSelect
            label="Length"
            onInputChange={(value) => dispatch({ type: 'SET_FIELD', field: 'length', value })}
            onSelectChange={(value) => dispatch({ type: 'SET_FIELD', field: 'lengthFactor', value })}
            factor={state.lengthFactor}
            value={state.length}
            units={lengthUnits}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputSelect
              label="Diameter"
              onInputChange={(value) => dispatch({ type: 'SET_FIELD', field: 'diameter', value })}
              onSelectChange={(value) => dispatch({ type: 'SET_FIELD', field: 'diameterFactor', value })}
              factor={state.diameterFactor}
              value={state.diameter}
              units={lengthUnits}
              fullWidth
          />
        </Grid>
      </Grid>
      <Typography variant="h6" style={{ marginTop: "2rem", marginBottom: ".5rem" }}>Pipe Volume</Typography>
      <InputSelect
        value={parseFloat((state.volume * state.volumeFactor).toFixed(4))}
        factor={state.volumeFactor}
        InputProps={{ readOnly: true }}
        onSelectChange={(value) => dispatch({ type: 'SET_FIELD', field: 'volumeFactor', value })}
        units={volumeUnits}
        error={isNaN(state.volume) || !isFinite(state.volume)}
        fullWidth
      />
    </form>
  );
});

export default PipeVolumeForm;
