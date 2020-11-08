import React from "react";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
// import UserProfile from "../../../pages/userProfile/index";

const customStyles = {
  container: (provided, state) => ({
    ...provided,
    fontFamily: ["Cairo", "sans-serif"].join(","),
  }),
};

const animatedComponents = makeAnimated();

class Single extends React.Component {
  render() {
    const { onHandleChange, options2, value } = this.props;
    return (
      <Select
        isRtl
        options={options2}
        styles={customStyles}
        isSearchable={false}
        onChange={onHandleChange}
        value={value}
      />
    );
  }
}

export default Single;
