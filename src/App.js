import React, {Component} from "react";
import logo from "./logo.svg";
import "./App.css";
import { Container, TextField } from "@material-ui/core";
import InputSelect from "./components/InputSelect";

class App extends Component {

  state = {volume: 0, dosage: 0, percent: 0, ppm: 0, chlorine: 0}

  updateState = (variable) => (event) => {
    this.setState({ [variable]: event.target.value});
    this.calculateChlorine();
  }

  calculateChlorine = () => {
    let amount = (this.state.ppm * this.state.volume) / (this.state.percent * 10000)
    this.setState({chlorine: amount})
  }

  render() {
    return (
      <div className="App">
        <Container maxWidth="md">
          <form noValidate autoComplete="off">
            <InputSelect label="Volume" onChange={this.updateState("volume")} />
            <TextField label="Dosage" onChange={this.updateState("dosage")} />
            <TextField label="Percent" onChange={this.updateState("percent")} />
            <TextField label="PPM" onChange={this.updateState("ppm")} />
          </form>
          <h1>Chlorine: {this.state.chlorine}</h1>
        </Container>
      </div>
    );
    }
}

export default App;
