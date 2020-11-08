const mysql = require("mysql");
const appConfig = require("../appConfig.js");

var DBconnect = mysql.createConnection({
  host: appConfig.mysqlAddress,
  user: appConfig.mysqlUserName,
  password: appConfig.mysqlPassword,
  database: appConfig.mysqlDatabase,
});

DBconnect.connect();

module.exports = {
  addTransaction: function (
    cstatus,
    camount,
    cdesc,
    cplan,
    ctoday,
    cexpDate,
    cclientId,
    ccallback
  ) {
    var pid = Math.floor(Math.random() * 100000000000);
    var values = [
      [cstatus, camount, cdesc, cplan, ctoday, cexpDate, pid, cclientId],
    ];
    var DBquery =
      "INSERT INTO status (TransactionCode, amount, ClientDescription, plan, payDate, expDate, PID, clientId) VALUES ?";
    DBconnect.query(DBquery, [values]);
    ccallback(pid);
  },
  updateTransaction: function (tcode, pid) {
    var DBquery =
      "UPDATE status SET TransactionCode = " +
      tcode +
      ", pid = 'null' WHERE PID = " +
      pid;
    DBconnect.query(DBquery);
  },
  getTransactions: function (callback) {
    var DBquery = "SELECT * FROM transactions";
    var totalToSend = "";
    DBconnect.query(DBquery, function (err, result, fields) {
      result.forEach(function (row) {
        var toFetch =
          "<tr>" +
          "<td>" +
          row.ID +
          "</td>" +
          "<td>" +
          row.TransactionCode +
          "</td>" +
          "<td>" +
          row.ClientFirstName +
          " " +
          row.ClientLastName +
          "</td>" +
          "<td>" +
          row.ClientEmail +
          "</td>" +
          "<td>" +
          row.ClientPhone +
          "</td>" +
          "<td>" +
          row.ClientAmount +
          "</td>" +
          "<td>" +
          row.payDate +
          "</td>" +
          "<td>" +
          row.ClientDescription +
          "</td>" +
          "</tr>";
        totalToSend += toFetch;
      });
      callback(unescape(totalToSend));
    });
  },
};
