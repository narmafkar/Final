import React, { useState } from "react";
import AppBar from "./AppBar/AppBar.js";
import Navbar from "./Navbar/Navbar.js";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../assets/jss/material-dashboard-react/components/adminStyle.js";
import routes from "../routes.js";

const useStyles = makeStyles(styles);

const Layout = ({ children, ...rest }) => {
  const classes = useStyles();
  const mainPanel = React.createRef();

  const [color] = React.useState("blue");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div>
      <AppBar
        routes={routes}
        color={color}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        <div className={classes.content}>{children}</div>
      </div>
    </div>
  );
};
export default Layout;
