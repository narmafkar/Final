import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import EleventHeaderCard from "../../userProfile/ElevatedHeaderCard";
import axios from "axios";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import Login from "../../Login/Login";
import { values } from "sequelize/types/lib/operators";
import { makeStyles } from "@material-ui/core/styles";
import HideAppBar from "../../../src/components/header";

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "'Cairo', sans-serif",
  },
  center: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Post() {
  const [open, setOpen] = React.useState(true);
  const [openLogin, setOpenLogin] = React.useState(false);
  let [persons, setPersons] = useState({
    result: "",
    status: "false",
    message: "",
    mode: "",
  });
  const router = useRouter();
  const classes = useStyles();

  const { id } = router.query;
  useEffect(() => {
    if (router.asPath !== router.route) {
      axios({
        method: "post",
        url: "/postUser2",
        data: {
          id: id,
        },
      }).then((res) => {
        if (res.data.status === "true") {
          setPersons({
            result: res.data.result,
            status: res.data.status,
          });
        } else if (res.data.status === "false") {
          setPersons({
            status: res.data.status,
            message: res.data.message,
            mode: res.data.mode,
          });
        }
      });
    }
  }, [router]);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const callLogin = () => {
    setOpenLogin(true);
  };

  const callPayment = () => {
    router.push("/Payment");
  };
  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  return (
    <div>
      <HideAppBar />
      {persons.status === "true" ? (
        <div className={classes.center}>
          <EleventHeaderCard persons={persons.result} detailButton={false} />
        </div>
      ) : (
        <Dialog
          style={{ direction: "ltr" }}
          open={open}
          TransitionComponent={Transition}
          keepMounted
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>
            <DialogContentText
              className={classes.root}
              id="alert-dialog-slide-description"
            >
              {persons.message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              className={classes.root}
              onClick={persons.mode === "login" ? callLogin : callPayment}
              type="submit"
              color="primary"
            >
              {persons.mode === "login" ? "ورود به حساب" : "شارژ حساب"}
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <Dialog
        open={openLogin}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseLogin}
      >
        <Login />
      </Dialog>
    </div>
  );
}
