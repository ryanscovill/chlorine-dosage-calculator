import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Container, TextField, InputAdornment } from "@material-ui/core";
import InputSelect from "./components/InputSelect";

class App extends Component {
  state = { volume: '', dosage: '', percent: '', chlorine: 0 };

  updateState = (variable) => (value) => {
    if (isNaN(Number(value))) {
      return;
    }
    this.setState({ [variable]: value }, () =>
      this.calculateChlorine()
    );
  };

  calculateChlorine = () => {
    let amount = parseFloat(
      (this.state.dosage * this.state.volume) / this.state.percent
    );
    let chlorineRequired = "";
    if (!isNaN(amount) && isFinite(amount)) {
      chlorineRequired = parseFloat(amount);
    }

    this.setState({ chlorine: chlorineRequired });
  };

  render() {
    return (
      <div className="App">
        <Container maxWidth="md">
          <form noValidate autoComplete="off">
            <div className="text-input">
              <InputSelect
                className="text-input"
                label="Volume"
                type="tel"
                pattern="^-?[0-9]\d*\.?\d*$"
                onChange={this.updateState("volume")}
                units={[
                  { name: "Cubic meters", factor: 1 },
                  { name: "Liters", factor: 1000 },
                  { name: "US Gallons", factor: 264.172 },
                  { name: "Gallons", factor: 219.969204701183 },
                ]}
              />
            </div>
            <div className="text-input">
              <TextField
                label="Dosage"
                type="tel"
                pattern="^-?[0-9]\d*\.?\d*$"
                onChange={(e) => this.updateState("dosage")(e.target.value)}
                value={this.state.dosage}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">mg/L</InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="text-input">
              <TextField
                className="text-input"
                label="Percent"
                type="tel"
                pattern="^-?[0-9]\d*\.?\d*$"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
                value={this.state.percent}
                onChange={(e) => this.updateState("percent")(e.target.value)}
              />
            </div>
          </form>
          <div className="text-input">
            <h3 style={{ marginTop: "3em" }}>Chlorine Required</h3>
            <InputSelect
              className="text-input"
              type="tel"
              pattern="^-?[0-9]\d*\.?\d*$"
              value={this.state.chlorine}
              InputProps={{
                readOnly: true,
              }}
              units={[
                { name: "Liters", factor: 1 },
                { name: "Cubic meters", factor: 0.001 },
                { name: "US Gallons", factor: 0.264172 },
                { name: "Gallons", factor: 0.219969204701183 },
              ]}
            />
          </div>
        </Container>
      </div>
    );
  }
}

export default App;
