const express = require("express");
const router = express.Router();
const passport = require("../config/passport.js");
var flash = require("connect-flash");

const {
  postUser,
  postUser2,
  getTableData,
  postTableData,
  putTableData,
  deleteTableData,
  postUserUseEffect,
  forget,
  submitChangePassword,
} = require("./opration.js");
const { zarinPalPost, verify } = require("./zarinPal.js");
const db = require("../models");
const bcrypt = require("bcryptjs");
router.post("/postUser", postUser);
router.post("/postUserUseEffect", postUserUseEffect);
router.post("/postUser2", postUser2);
router.post("/getTableData", getTableData);
router.post("/crud", postTableData);
router.put("/crud", putTableData);
router.delete("/crud", deleteTableData);

// zarinpal routes
router.post("/x/handle/accepted", zarinPalPost);
router.get("/verify", verify);

router.post("/forget", forget);
router.post("/submitChangePassword", submitChangePassword);

router.post(
  "/signup",
  passport.authenticate("local-signup", {
    successRedirect: "/success-signup", // redirect to the secure profile section
    failureRedirect: "/failure-signup", // redirect back to the signup page if there is an error
    failureFlash: true, // allow flash messages
  })
);
router.get("/success-signup", function (req, res) {
  res.json({
    user: req.user,
    message: req.flash("signupMessage"),
    mode: "success",
  });
});
router.get("/failure-signup", function (req, res) {
  console.log("salam kharab shod");
  res.send({
    status: false,
    message: req.flash("signupMessage"),
    mode: "warning",
  });
});

router.post(
  "/login",
  passport.authenticate("local-login", {
    successRedirect: "/success-login",
    failureRedirect: "/failure-login",
    failureFlash: true,
  })
);
router.get("/success-login", function (req, res) {
  const user = JSON.parse(JSON.stringify(req.user)); // hack
  const cleanUser = Object.assign({}, user);
  if (cleanUser.local) {
    console.log(`Deleting ${cleanUser.local.password}`);
    delete cleanUser.local.password;
  }
  res.json({
    user: cleanUser,
    message: "ورود با موفقیت انجام شد",
    mode: "success",
  });
});
router.get("/failure-login", function (req, res) {
  res.send({
    status: false,
    message: req.flash("loginMessage"),
    mode: "warning",
  });
});

router.get("/user", (req, res, next) => {
  if (req.user) {
    return res.json({ user: req.user });
  } else {
    return res.json({ user: null });
  }
});

router.post("/checkUser", function (req, res) {
  const { username } = req.body;
  console.log(username.length);
  console.log(username.charAt(0));
  if (isNaN(username) || username.charAt(0) != 0 || username.length != 11) {
    res.send({
      status: false,
      message: "شماره موبایل معتبر وارد کنید",
      mode: "warning",
    });
  } else {
    db.users.findAll({ where: { username: username } }).then((data) => {
      if (data.length) {
        res.send({
          status: false,
          message: "کاربر وجود دارد",
          mode: "warning",
        });
      } else {
        res.send({
          status: true,
          message: "در حال بررسی ...",
          mode: "success",
        });
      }
    });
  }
});

router.get("/logout", (req, res, next) => {
  if (req.user) {
    req.session.destroy();
    res.clearCookie("connect.sid"); // clean up!
    return res.json({ msg: "logging you out" });
  } else {
    return res.json({ msg: "no user to log out!" });
  }
});

router.get("/isLogin", (req, res) => {
  if (req.user) {
    res.send({ status: true });
  } else {
    res.send({ status: false });
  }
});

module.exports = router;
