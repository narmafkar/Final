import React, { useState } from "react";
import VerificationInput from "react-verification-input";
import Typography from "@material-ui/core/Typography";
import { useRouter } from "next/router";
import axios from "axios";
import { Alert, AlertTitle } from "@material-ui/lab";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import Button from "../../src/components/CustomButtons/Button.js";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
    fontFamily: "'Cairo', sans-serif",
  },
}));

export default function Verification(props) {
  const [open, setOpen] = React.useState(false);
  const [alert, setAlert] = useState({
    mode: "",
    message: "",
  });

  const router = useRouter();
  const classes = useStyles();

  const backClick = () => {
    router.push("/userProfile");
  };
  const {
    username,
    password,
    email,
    address,
    name,
    officeName,
    officePhone,
    mobile,
    verificationCode,
  } = router.query;
  const handleChange = (e) => {
    if (e.nativeEvent.target.value.length === 4) {
      if (e.nativeEvent.target.value === verificationCode) {
        axios
          .post("/signup", {
            username: mobile,
            password: password,
            email: email,
            address: address,
            name: name,
            officeName: officeName,
            officePhone: officePhone,
            mobile: mobile,
          })
          .then(function (response) {
            console.log("response is:", response);
            if (response) {
              if (response.data.user) {
                router.push("/userProfile");
              }
            }
          });
        setAlert({
          mode: "success",
          message: "ثبت نام با موفقیت انجام شد",
        });
        setOpen(true);
      } else {
        setAlert({
          mode: "warning",
          message: "کد وارد شده صحیح نمیباشد",
        });
        setOpen(true);
      }
    }
  };
  return (
    <div>
      <Collapse in={open}>
        <Alert
          severity={alert.mode}
          action={
            <IconButton
              style={{ position: "absolute", left: "5%" }}
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <strong className={classes.root}>{"  " + alert.message}</strong>
        </Alert>
      </Collapse>

      <p className="titleTypo">لطفا کد فعالسازی را وارد کنید</p>
      <VerificationInput
        inputField={{
          onChange: handleChange,
        }}
        length={4}
        placeholder=""
        validChars="0-9"
        removeDefaultStyles
        container={{
          className: "container-vCode",
        }}
        characters={{
          className: "characters",
        }}
        character={{
          className: "character",
          classNameInactive: "character--inactive",
          classNameSelected: "character--selected",
        }}
      />
      <p className="buttomTypo">کد فعالسازی به شماره  {mobile}  پیامک شده</p>
      <Button
        className="buttomTypo2"
        color="primary"
        type="Submit"
        onClick={backClick}
      >
        بازگشت به صفحه قبلی
      </Button>
    </div>
  );
}
