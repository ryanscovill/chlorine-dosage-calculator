import { useState } from "react";
import { Container, InputAdornment, Typography, Button, ThemeProvider, CssBaseline, Grid } from "@mui/material";
import InputSelect from "./components/InputSelect";
import NumberField from "./components/NumberField";
import React from "react";
import useAppTheme from "./theme";

const App: React.FC = () => {
  const initialState = { volume: '', volumeFactor: 1, dosage: '', percent: '', chlorine: 0, chlorineFactor: 1000 };

  const [state, setState] = useState({ ...initialState, isFormReset: true });

  const units = [
    { name: "Liters", factor: 1000 },
    { name: "Cubic Meters", factor: 1 },
    { name: "Gallons (Imperial)", factor: 219.969204701183 },
    { name: "Gallons (US)", factor: 264.172 },
  ];

  const updateState = (variable: string) => (value: any) => {
    if (isNaN(Number(value))) {
      return;
    }
    setState((prevState) => {
      const newState = { ...prevState, [variable]: value, isFormReset: false };
      let chlorineAmount = calculateChlorine(newState);
      return { ...newState, chlorine: chlorineAmount };
    });
  };

  const calculateChlorine = (s: typeof initialState) => {
    return parseFloat(((parseFloat(s.dosage) * (parseFloat(s.volume) / s.volumeFactor)) / (parseFloat(s.percent) * 10000)).toFixed(4));    
  };

  const clearState = () => {
    setState({ volume: '', volumeFactor: 1, dosage: '', percent: '', chlorine: 0, chlorineFactor: 1000, isFormReset: true });
  };

  const theme = useAppTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Container maxWidth="sm">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4" style={{ marginBottom: '.5em', marginTop: '.5em' }}>Chlorine Dosage Calculator</Typography>
            {!state.isFormReset && (
              <Button variant="contained" color="secondary" onClick={clearState}>Clear</Button>
            )}
          </div>
          <form noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputSelect
                  label="Volume"
                  onInputChange={updateState("volume")}
                  onSelectChange={updateState("volumeFactor")}
                  factor={state.volumeFactor}
                  value={state.volume}
                  units={units}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
              <NumberField
                label="Dosage"
                onChange={(e: { target: { value: any; }; }) => updateState("dosage")(e.target.value)}
                value={state.dosage}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">mg/L or ppm</InputAdornment>
                  ),
                }}
                fullWidth
              />
              </Grid>
              <Grid item xs={12}>
                <NumberField
                  label="Chlorine Concentration %"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">%</InputAdornment>
                    ),
                  }}
                  value={state.percent}
                  onChange={(e: { target: { value: any; }; }) => updateState("percent")(e.target.value)}
                  fullWidth
                />
              </Grid>
            </Grid>
          </form>
          <div className="text-input">
            <Typography variant="h5" style={{ marginTop: "2em" }}>Chlorine Required</Typography>
            <InputSelect
              value={parseFloat((state.chlorine * state.chlorineFactor).toFixed(4))}
              factor={state.chlorineFactor}
              InputProps={{
                readOnly: true,
              }}
              onSelectChange={updateState("chlorineFactor")}
              units={units}
              error={isNaN(state.chlorine) || !isFinite(state.chlorine)}
              fullWidth
            />
          </div>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
