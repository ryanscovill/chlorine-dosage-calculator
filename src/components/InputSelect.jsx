import React from "react";
import { Select, MenuItem } from "@material-ui/core";
import NumberField from "./NumberField";

class InputSelect extends React.Component {

  handleSelectChange = (e) => {
      this.props.onSelectChange(e.target.value);
  }

  handleInputChange = (e) => {
      if (isNaN(Number(e.target.value))) {
        return;
      }
      this.props.onInputChange(e.target.value);
  }

  render() {
    let { units, value, factor, ...otherProps } = this.props;
    return (
      <div style={{ display: "flex" }}>
        <NumberField {...otherProps} value={value} onChange={this.handleInputChange} />
        <Select displayEmpty value={factor} onChange={this.handleSelectChange}>
          {units.map((unit) => (
            <MenuItem key={unit.name} value={unit.factor}>{unit.name}</MenuItem>
          ))}
        </Select>
      </div>
    );
  }
}

export default InputSelect;
