const mySqlLib = require("../zarinPal/lib/mySQLjobs");
const zarinpalLib = require("../zarinpal/lib/zarinpal");
const appConfig = require("../zarinPal/appConfig.js");
const session = require("express-session");
var moment = require("jalali-moment");
moment.locale("fa", { useGregorianParser: true });

const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });

module.exports = {
  zarinPalPost: (req, res) => {
    var plan = req.body.plan;
    var clientId = req.user.id;
    console.log("inde dadash: ", req.user.id);
    var amount, desc, expDate;

    var today = moment().format("YYYY/MM/DD");
    var nowDate = moment(today, "YYYY/MM/DD");

    if (plan === "A") {
      (amount = "10000"),
        (desc = " "),
        (expDate = nowDate.add(1, "month").format("YYYY/MM/DD"));
    }
    if (plan === "B") {
      (amount = "20000"),
        (desc = " "),
        (expDate = nowDate.add(3, "month").format("YYYY/MM/DD"));
    }
    if (plan === "C") {
      (amount = "50000"),
        (desc = " "),
        (expDate = nowDate.add(6, "month").format("YYYY/MM/DD"));
    }
    if (plan === "D") {
      (amount = "100000"),
        (desc = " "),
        (expDate = nowDate.add(12, "month").format("YYYY/MM/DD"));
    }

    mySqlLib.addTransaction(
      "Pending",
      amount,
      desc,
      plan,
      today,
      expDate,
      clientId,

      function (getpid) {
        zarinpalLib.request(
          amount,
          desc,
          plan,
          today,
          expDate,
          getpid,
          clientId,

          function (data) {
            if (data.status) {
              var test = data.url;
              res.send(test);
              res.end();
            } else {
              res.render("error", {
                zpTitle: appConfig.appTitle,
                zpError: data.code,
              });
            }
          }
        );
      }
    );
  },
  verify: (req, res) => {
    zarinpalLib.verify(
      req.query.Status,
      req.query.Amount,
      req.query.Authority,
      function (data) {
        if (data.status) {
          // res.send({
          //   zpTitle: appConfig.appTitle,
          //   zpRefID: data.code,
          // });
          console.log("ok shod");
          res.redirect("/Payment");
          mySqlLib.updateTransaction(data.code, req.query.pid);
        } else {
          console.log("kharab shod");
          res.redirect("/Payment");

          // res.send({
          //   zpTitle: appConfig.appTitle,
          //   zpError: data.code,
          // });
        }
      }
    );
    // res.redirect("/Payment");
  },
};
