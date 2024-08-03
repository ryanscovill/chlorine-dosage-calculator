import { Component } from "react";
import "./App.css";
import { Container, InputAdornment, Typography, Button, ThemeProvider } from "@mui/material";
import InputSelect from "./components/InputSelect";
import NumberField from "./components/NumberField";
import theme from "./theme";

class App extends Component {
  initialState = { volume: '', volumeFactor: 1, dosage: '', percent: '', chlorine: 0, chlorineFactor: 1000 };

  state = { ...this.initialState, isFormReset: true };

  units = [
    { name: "Liters", factor: 1000 },
    { name: "Cubic Meters", factor: 1 },
    { name: "Imperial Gallons", factor: 219.969204701183 },
    { name: "US Gallons", factor: 264.172 },
  ];

  updateState = (variable: string) => (value: any) => {
    if (isNaN(Number(value))) {
      return;
    }
    this.setState({ [variable]: value, isFormReset: false }, () =>
      this.calculateChlorine()
    );
  };

  calculateChlorine = () => {
    let amount = parseFloat(
      (((parseFloat(this.state.dosage) * (parseFloat(this.state.volume) / this.state.volumeFactor)) / (parseFloat(this.state.percent) * 10000)).toFixed(4)).toString()
    );
    let chlorineRequired = "";
    if (!isNaN(amount) && isFinite(amount)) {
      chlorineRequired = amount.toString();
    }

    this.setState({ chlorine: chlorineRequired });
  };

  clearState = () => {
    this.setState({ volume: '', dosage: '', percent: '', chlorine: 0, isFormReset: true });
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <Container maxWidth="md">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h4" style={{ marginBottom: '1em', marginTop: '.5em' }}>Chlorine Dosage Calculator</Typography>
              {!this.state.isFormReset && (
                <Button variant="contained" color="secondary" onClick={this.clearState}>Clear</Button>
              )}
            </div>
            <form noValidate autoComplete="off">
              <div className="text-input">
                <InputSelect
                  label="Volume"
                  onInputChange={this.updateState("volume")}
                  onSelectChange={this.updateState("volumeFactor")}
                  factor={this.state.volumeFactor}
                  value={this.state.volume}
                  units={this.units}
                />
              </div>
              <div className="text-input">
                <NumberField
                  label="Dosage"
                  onChange={(e: { target: { value: any; }; }) => this.updateState("dosage")(e.target.value)}
                  value={this.state.dosage}
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
                  value={this.state.percent}
                  onChange={(e: { target: { value: any; }; }) => this.updateState("percent")(e.target.value)}
                />
              </div>
            </form>
            <div className="text-input">
              <Typography variant="h5" style={{ marginTop: "2em" }}>Chlorine Required</Typography>
              <InputSelect
                value={parseFloat((this.state.chlorine * this.state.chlorineFactor).toFixed(4))}
                factor={this.state.chlorineFactor}
                InputProps={{
                  readOnly: true,
                }}
                onSelectChange={this.updateState("chlorineFactor")}
                units={this.units}
              />
            </div>
          </Container>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
