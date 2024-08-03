import { useState } from "react";
import "./App.css";
import { Container, InputAdornment, Typography, Button, ThemeProvider, CssBaseline } from "@mui/material";
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
    { name: "Imperial Gallons", factor: 219.969204701183 },
    { name: "US Gallons", factor: 264.172 },
  ];

  const updateState = (variable: string) => (value: any) => {
    if (isNaN(Number(value))) {
      return;
    }
    setState((prevState) => ({ ...prevState, [variable]: value, isFormReset: false }));
    calculateChlorine()
  };

  const calculateChlorine = () => {
    let amount = parseFloat(
      (((parseFloat(state.dosage) * (parseFloat(state.volume) / state.volumeFactor)) / (parseFloat(state.percent) * 10000)).toFixed(4)).toString()
    );
    let chlorineRequired = 0;
    if (!isNaN(amount) && isFinite(amount)) {
      chlorineRequired = amount;
    }
    setState((prevState) => ({ ...prevState, chlorine: chlorineRequired }));
  };

  const clearState = () => {
    setState({ volume: '', volumeFactor: 1, dosage: '', percent: '', chlorine: 0, chlorineFactor: 1000, isFormReset: true });
  };

  const theme = useAppTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Container maxWidth="md">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4" style={{ marginBottom: '.5em', marginTop: '.5em' }}>Chlorine Dosage Calculator</Typography>
            {!state.isFormReset && (
              <Button variant="contained" color="secondary" onClick={clearState}>Clear</Button>
            )}
          </div>
          <form noValidate autoComplete="off">
            <div className="text-input">
              <InputSelect
                label="Volume"
                onInputChange={updateState("volume")}
                onSelectChange={updateState("volumeFactor")}
                factor={state.volumeFactor}
                value={state.volume}
                units={units}
              />
            </div>
            <div className="text-input">
              <NumberField
                label="Dosage"
                onChange={(e: { target: { value: any; }; }) => updateState("dosage")(e.target.value)}
                value={state.dosage}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">mg/L</InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="text-input">
              <NumberField
                label="Percent"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
                value={state.percent}
                onChange={(e: { target: { value: any; }; }) => updateState("percent")(e.target.value)}
              />
            </div>
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
            />
          </div>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
