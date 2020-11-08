import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { Modal, ModalBody } from "reactstrap";
import Login from "../../pages/Login/Login";
import { container } from "../assets/jss/material-dashboard-react";
import { TransitionProps } from "@material-ui/core/transitions";
import Dialog from "@material-ui/core/Dialog";
import { CustomMenu } from "./Header/CustomMenu.tsx";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginBottom: "50px",
    },
    btnLog: {
      position: "absolute",
      top: "8px",
      left: "16px",
      fontFamily: "'Cairo', sans-serif",
      fontSize: "14px",
    },
  })
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const logout = () => {
  axios.get("/logout").then((res) => {
    if (res) {
      window.location.reload();
    }
  });
};

export default function HideAppBar(props: Props) {
  const [drawerIsOpen, setDrawerIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setDrawerIsOpen(!drawerIsOpen);
  };

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [state, setState] = useState({
    loggedIn: false,
    user: null,
    alert: "",
  });

  useEffect(() => {
    axios.get("/user").then((response) => {
      if (!!response.data.user) {
        console.log("THERE IS A USER");
        setState({
          loggedIn: true,
          user: response.data.user,
          alert: "خوش آمدید ",
        });
        if (state.user) console.log("state is :", state.user);
      } else {
        setState({
          loggedIn: false,
          user: null,
          alert: "ورود / عضویت",
        });
        console.log("THERE IS NOT A USER");
      }
    });
  }, [state.loggedIn]);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar>
            {state.loggedIn ? (
              <Button
                className={classes.btnLog}
                color="inherit"
                onClick={logout}
              >
                خروج از حساب
              </Button>
            ) : (
              <Button
                className={classes.btnLog}
                color="inherit"
                onClick={handleClickOpen}
              >
                {state.alert}
              </Button>
            )}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
          <CustomMenu drawerIsOpen={drawerIsOpen} toggleDrawer={toggleDrawer} />
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <Login />
      </Dialog>
    </div>
  );
}
