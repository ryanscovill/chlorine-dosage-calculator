import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Container, TextField, InputAdornment } from "@material-ui/core";
import InputSelect from "./components/InputSelect";

class App extends Component {
  state = { volume: 0, dosage: 0, percent: 0, chlorine: 0};

  updateState = (variable) => (value) => {
    this.setState({ [variable]: value });
    this.calculateChlorine();
  };

  calculateChlorine = () => {
    let amount =
      (this.state.dosage * this.state.volume) / (this.state.percent * 1000);
    this.setState({ chlorine: amount });
  };

  render() {
    return (
      <div className="App">
        <Container maxWidth="md">
          <form noValidate autoComplete="off">
          <div class="text-input">
            <InputSelect
              className="text-input"
              label="Volume"
              onChange={this.updateState("volume")}
              units={[
                { name: "cubic meters", factor: 1 },
                { name: "liters", factor: 1000 },
                { name: "US Gallon", factor: 264.172 },
                { name: "Gallon", factor: 219.969204701183 },
              ]}
            />
            </div>
            <div className="text-input">
            <TextField
              label="Dosage"
              onChange={(e) => this.updateState("dosage")(e.target.value)}
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">%</InputAdornment>
                ),
              }}
              onChange={(e) => this.updateState("percent")(e.target.value)}
            />
            </div>
          </form>
          <div className="text-input">
          <h3 style={{marginTop: "3em"}}>Chlorine Required</h3>
            <InputSelect
              className="text-input"
              value={this.state.chlorine}
              InputProps={{
                readOnly: true
              }}
              units={[
                { name: "cubic meters", factor: 1 },
                { name: "liters", factor: 1000 },
                { name: "US Gallon", factor: 264.172 },
                { name: "Gallon", factor: 219.969204701183 },
              ]}
            />
            </div>
        </Container>
      </div>
    );
  }
}

export default App;
