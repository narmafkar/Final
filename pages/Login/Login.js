import React, { useState, useEffect } from "react";
import Router from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
    fontFamily: "'Cairo', sans-serif",
  },
}));
function Form({ option }) {
  const router = useRouter();
  const classes = useStyles();
  const [confirm, setConfirm] = useState({ message: "" });
  const [open, setOpen] = React.useState(false);
  const [state, setState] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    address: "",
    name: "",
    officeName: "",
    officePhone: "",
    mobile: "",
  });
  const [alert, setAlert] = useState({
    mode: "",
    message: "",
  });

  const handleClick = () => {
    option === 1
      ? axios
          .post("/login", {
            username: state.mobile,
            password: state.password,
          })
          .then(function (response) {
            setAlert({
              mode: response.data.mode,
              message: response.data.message,
            });
            console.log("response is:", response);

            if (response) {
              if (response.data.user) {
                window.location.reload();
              }
            }
          })
          .catch(function (error) {
            console.log("Error: " + error);
          })
      : option === 2
      ? axios
          .post("/checkUser", {
            username: state.mobile,
          })
          .then(function (response) {
            setAlert({
              mode: response.data.mode,
              message: response.data.message,
            });
            if (response.data.status) {
              var verificationCode = Math.floor(1000 + Math.random() * 9000);
              router.push({
                pathname: "/verification",
                query: {
                  username: state.mobile,
                  password: state.password,
                  email: state.email,
                  address: state.address,
                  name: state.name,
                  officeName: state.officeName,
                  officePhone: state.officePhone,
                  mobile: state.mobile,
                  verificationCode: verificationCode,
                },
              });
              axios
                .post("http://ippanel.com/api/select", {
                  op: "pattern",
                  user: "narmafkar",
                  pass: "shahed212",
                  fromNum: "+983000505",
                  toNum: state.mobile,
                  patternCode: "83x8hw4t7m",
                  inputData: [
                    { name: state.name, verificationCode: verificationCode },
                  ],
                })
                .then((res) => {
                  console.log(res);
                });
            }
          })
      : axios
          .post("/forget", {
            username: state.mobile,
          })
          .then(function (response) {
            setAlert({
              mode: response.data.mode,
              message: response.data.message,
            });
            if (response.data.status) {
              axios.post("http://ippanel.com/api/select", {
                op: "pattern",
                user: "narmafkar",
                pass: "shahed212",
                fromNum: "+983000505",
                toNum: state.mobile,
                patternCode: "ya88ne98nl",
                inputData: [{ newPass: response.data.newPass }],
              });
            }
          });
  };

  const handleChangeText = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleSubmit = () => {
    const { password, confirmPassword } = state;
    if (option === 2) {
      if (password !== confirmPassword) {
        setAlert({
          mode: "warning",
          message: "پسورد همخوانی ندارد",
        });
        setOpen(true);
      } else {
        handleClick();
        setOpen(true);
      }
    } else {
      handleClick();
      setOpen(true);
    }
  };
  return (
    <form
      className="account-form"
      onSubmit={(evt) => {
        evt.preventDefault();
        handleSubmit();
      }}
    >
      <div className={classes.root}>
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

        <div
          className={
            "account-form-fields " +
            (option === 1 ? "sign-in" : option === 2 ? "sign-up" : "forgot")
          }
        >
          <input
            id="mobile"
            name="mobile"
            placeholder="موبایل"
            required
            onInvalid={function (e) {
              e.target.setCustomValidity(
                "لطفا شماره موبایل خود را وارد نمایید"
              );
            }}
            onInput={function (e) {
              e.target.setCustomValidity("");
            }}
            onChange={handleChangeText}
          />

          <input
            id="password"
            name="password"
            type="password"
            placeholder="رمز عبور"
            required={option === 1 || option === 2 ? true : false}
            onInvalid={function (e) {
              e.target.setCustomValidity("رمز عبور را وارد نمایید");
            }}
            onInput={function (e) {
              e.target.setCustomValidity("");
            }}
            disabled={option === 3 ? true : false}
            onChange={handleChangeText}
          />
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="تکرار رمز عبور"
            disabled={option === 1 || option === 3 ? true : false}
            onChange={handleChangeText}
          />
          <input
            id="address"
            name="address"
            type="address"
            placeholder="آدرس"
            required={option === 2 ? true : false}
            onInvalid={function (e) {
              e.target.setCustomValidity("لطفا آدرس دفتر را وارد نمایید");
            }}
            onInput={function (e) {
              e.target.setCustomValidity("");
            }}
            disabled={option === 1 || option === 3 ? true : false}
            onChange={handleChangeText}
          />
          <input
            id="name"
            name="name"
            placeholder="نام و نام خانوادگی"
            required={option === 2 ? true : false}
            onInvalid={function (e) {
              e.target.setCustomValidity(
                "لطفا نام و نام خانوادگی را وارد نمایید"
              );
            }}
            onInput={function (e) {
              e.target.setCustomValidity("");
            }}
            disabled={option === 1 || option === 3 ? true : false}
            onChange={handleChangeText}
          />
          <input
            id="officeName"
            name="officeName"
            placeholder="نام دفتر"
            required={option === 2 ? true : false}
            onInvalid={function (e) {
              e.target.setCustomValidity("لطفا نام دفتر را وارد نمایید");
            }}
            onInput={function (e) {
              e.target.setCustomValidity("");
            }}
            disabled={option === 1 || option === 3 ? true : false}
            onChange={handleChangeText}
          />
          <input
            id="officePhone"
            name="officePhone"
            placeholder="تلفن دفتر"
            required={option === 2 ? true : false}
            onInvalid={function (e) {
              e.target.setCustomValidity("لطفا تلفن دفتر را وارد نمایید");
            }}
            onInput={function (e) {
              e.target.setCustomValidity("");
            }}
            disabled={option === 1 || option === 3 ? true : false}
            onChange={handleChangeText}
          />
          <input
            id="email"
            name="email"
            placeholder="ایمیل"
            required={option === 2 ? true : false}
            onInvalid={function (e) {
              e.target.setCustomValidity("لطفا ایمیل معتبر وارد نمایید");
            }}
            onInput={function (e) {
              e.target.setCustomValidity("");
            }}
            onChange={handleChangeText}
            disabled={option === 1 || option === 3 ? true : false}
          />
        </div>
      </div>
      <button className="btn-submit-form" type="submit">
        {option === 1 ? "ورود" : option === 2 ? "ثبت نام" : "بازیابی رمز عبور"}
      </button>
    </form>
  );
}
export default function Login() {
  const [option, setOption] = React.useState(1);

  return (
    <div className="container-login">
      <header>
        <div
          className={
            "header-headings " +
            (option === 1 ? "sign-in" : option === 2 ? "sign-up" : "forgot")
          }
        >
          <span>ورود به حساب</span>
          <span>ثبت نام</span>
          <span>بازیابی رمز عبور</span>
        </div>
      </header>
      <ul className="options">
        <li
          className={option === 1 ? "active" : ""}
          onClick={() => setOption(1)}
        >
          ورود
        </li>
        <li
          className={option === 2 ? "active" : ""}
          onClick={() => setOption(2)}
        >
          ثبت نام
        </li>
        <li
          className={option === 3 ? "active" : ""}
          onClick={() => setOption(3)}
        >
          فراموشی رمز عبور
        </li>
      </ul>
      <Form option={option} />
    </div>
  );
}
