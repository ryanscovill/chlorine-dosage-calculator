import React from "react";
import { TextField, Select, MenuItem } from "@material-ui/core";

class InputSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
    let { units } = this.props;
    this.state = {factor: units[0].factor, value: '', standardizedValue: ''};
  }

  handleSelectChange = (e) => {
      let factor = e.target.value
      this.setState({factor: factor});
      this.setState({value: this.state.standardizedValue * factor})
  }

  handleInputChange = (e) => {
      this.setState({value: e.target.value, standardizedValue: e.target.value / this.state.factor}, () => this.props.onChange(this.state.standardizedValue));
  }

  render() {
    let { units, onChange, ...otherProps } = this.props;
    return (
      <div style={{ display: "flex" }}>
        <TextField {...otherProps} value={this.state.value} onChange={this.handleInputChange} />
        <Select displayEmpty value={this.state.factor} onChange={this.handleSelectChange}>
          {units.map((unit) => (
            <MenuItem key={unit.name} value={unit.factor}>{unit.name}</MenuItem>
          ))}
        </Select>
      </div>
    );
  }
}

export default InputSelect;
