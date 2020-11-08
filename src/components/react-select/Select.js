import React from "react";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const customStyles = {
  control: (base) => ({
    ...base,
    fontFamily: ["Cairo", "sans-serif"].join(","),
    direction: "rtl",
  }),
};

const animatedComponents = makeAnimated();

class Example extends React.Component {
  state = {
    selectedOption: null,
  };

  render() {
    const { selectedOption, onHandleChange, options2 } = this.props;
    return (
      <Select
        onChange={onHandleChange}
        closeMenuOnSelect={false}
        components={animatedComponents}
        placeholder={"انتخاب ..."}
        isMulti
        isRtl
        options={options2}
        styles={customStyles}
        isSearchable={false}
      />
    );
  }
}

export default Example;
