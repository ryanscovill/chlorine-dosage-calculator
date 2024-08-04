import React, { useReducer, useImperativeHandle, forwardRef } from "react";
import { Grid, InputAdornment, Typography } from "@mui/material";
import InputSelect from "./InputSelect";
import NumberField from "./NumberField";
import { units } from "../models/unit.model";

interface State {
  volume: string;
  volumeFactor: number;
  dosage: string;
  percent: string;
  chlorine: number;
  chlorineFactor: number;
  isFormReset: boolean;
}

type Action =
  | { type: 'SET_FIELD', field: keyof State, value: string | number }
  | { type: 'RESET' };

const initialState: State = { volume: '', volumeFactor: 1, dosage: '', percent: '', chlorine: 0, chlorineFactor: 1000, isFormReset: true };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_FIELD':
      const newState = { ...state, [action.field]: action.value, isFormReset: false };
      return { ...newState, chlorine: calculateChlorine(newState) };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

const calculateChlorine = (s: State) => {
  const volume = parseFloat(s.volume) / s.volumeFactor;
  const dosage = parseFloat(s.dosage);
  const percent = parseFloat(s.percent);
  if (isNaN(volume) || isNaN(dosage) || isNaN(percent)) {
    return 0;
  }
  return (dosage * volume) / (percent * 10000);
};

interface ChlorineFormProps {
  onFormResetChange?: (isReset: boolean) => void;
}

const ChlorineForm = forwardRef(({ onFormResetChange = () => {} }: ChlorineFormProps, ref) => {
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
            label="Volume"
            onInputChange={(value) => dispatch({ type: 'SET_FIELD', field: 'volume', value })}
            onSelectChange={(value) => dispatch({ type: 'SET_FIELD', field: 'volumeFactor', value })}
            factor={state.volumeFactor}
            value={state.volume}
            units={units}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <NumberField
            label="Dosage"
            onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'dosage', value: e.target.value })}
            value={state.dosage}
            InputProps={{
              endAdornment: <InputAdornment position="end">mg/L or ppm</InputAdornment>,
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <NumberField
            label="Chlorine Concentration %"
            onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'percent', value: e.target.value })}
            value={state.percent}
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
            fullWidth
          />
        </Grid>
      </Grid>
      <Typography variant="h5" style={{ marginTop: "2em" }}>Chlorine Required</Typography>
      <InputSelect
        value={parseFloat((state.chlorine * state.chlorineFactor).toFixed(4))}
        factor={state.chlorineFactor}
        InputProps={{ readOnly: true }}
        onSelectChange={(value) => dispatch({ type: 'SET_FIELD', field: 'chlorineFactor', value })}
        units={units}
        error={isNaN(state.chlorine) || !isFinite(state.chlorine)}
        fullWidth
      />
    </form>
  );
});

export default ChlorineForm;
