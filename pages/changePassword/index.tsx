import React from "react";
import HideAppBar from "../../src/components/header";
import Card from "../../src/components/Card/Card.js";
import CardHeader from "../../src/components/Card/CardHeader.js";
import CardBody from "../../src/components/Card/CardBody.js";
import Button from "../../src/components/CustomButtons/Button.js";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import axios from "axios";
import { Alert, AlertTitle } from "@material-ui/lab";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Slide from "@material-ui/core/Slide";
import Login from "../Login/Login";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
    fontFamily: "'Cairo', sans-serif",
  },
}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function changePassword() {
  const classes = useStyles();
  const [isLogin, setIsLogin] = React.useState(false);
  const [openLogin, setOpenLogin] = React.useState(false);

  const [values, setValues] = React.useState({
    showPassword1: false,
    showPassword2: false,
    showPassword3: false,
  });
  const [alert, setAlert] = React.useState({
    mode: "",
    message: "",
  });
  const [state, setState] = React.useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState(true);
  React.useEffect(() => {
    axios.get("/isLogin").then(function (res) {
      console.log(res.data.status);
      setIsLogin(res.data.status);
    });
  }, [isLogin]);

  const callLogin = () => {
    setOpenLogin(true);
  };

  const handleClick = () => {
    axios
      .post("/submitChangePassword", {
        oldPassword: state.oldPassword,
        newPassword: state.newPassword,
        confirmPassword: state.confirmPassword,
      })
      .then(function (response) {
        setAlert({
          mode: response.data.mode,
          message: response.data.message,
        });
        setOpen(true);
      });
  };
  const handleChangeText = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  const handleClickShowPassword1 = () => {
    setValues({ ...values, showPassword1: !values.showPassword1 });
  };
  const handleClickShowPassword2 = () => {
    setValues({ ...values, showPassword2: !values.showPassword2 });
  };
  const handleClickShowPassword3 = () => {
    setValues({ ...values, showPassword3: !values.showPassword3 });
  };

  return (
    <div className="container">
      <HideAppBar />
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
      {isLogin ? (
        <Card>
          <CardHeader color="primary">
            <h4 className="userProfile-CardHeader">تغییر رمز عبور</h4>
          </CardHeader>
          <CardBody>
            <div className="changePassword-CardBody">
              <div className="inputPass">
                <OutlinedInput
                  name="oldPassword"
                  fullWidth
                  type={values.showPassword1 ? "text" : "password"}
                  placeholder="رمز عبور فعلی"
                  onChange={handleChangeText}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword1}
                        edge="end"
                      >
                        {values.showPassword1 ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </div>
              <div className="inputPass">
                <OutlinedInput
                  name="newPassword"
                  fullWidth
                  type={values.showPassword2 ? "text" : "password"}
                  placeholder="رمز عبور جدید"
                  onChange={handleChangeText}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword2}
                        edge="end"
                      >
                        {values.showPassword2 ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </div>
              <div className="inputPass">
                <OutlinedInput
                  name="confirmPassword"
                  fullWidth
                  type={values.showPassword3 ? "text" : "password"}
                  placeholder="تکرار رمز عبور جدید"
                  onChange={handleChangeText}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword3}
                        edge="end"
                      >
                        {values.showPassword3 ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </div>
              <Button color="primary" onClick={handleClick}>
                تغییر رمز عبور
              </Button>
            </div>
          </CardBody>
        </Card>
      ) : (
        <Dialog
          style={{ direction: "ltr" }}
          open={message}
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
              برای ورود به این قسمت ابتدا وارد حساب خود شوید
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Link href="/userProfile">
              <Button type="submit" color="primary">
                بازگشت
              </Button>
            </Link>
            <Button fullWidth onClick={callLogin} type="submit" color="primary">
              ورود / عضویت
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
