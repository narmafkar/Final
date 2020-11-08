var express = require("express");
var next = require("next");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var db = require("./config/connection.js");
var port = parseInt(process.env.PORT, 10) || 8564;
var dev = process.env.NODE_ENV !== "production";
var server = next({ dev });
var handle = server.getRequestHandler();
var session = require("express-session");
var app = express();

const passport = require("./config/passport.js");

var flash = require("connect-flash");

global.db = db;

const { getUser, postUser, getStatus } = require("./routes/opration.js");
const { zarinPalPost, verify } = require("./routes/zarinPal.js");
var zpSession;
var cors = require("cors");
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // parse form data client
app.use(cors());
app.use(express.static("public"));
app.use(
  session({
    secret: "vidyapathaisalwaysrunning",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
const router = require("./routes/passport.js");
app.use(router);

app.all("*", handle);

server.prepare().then(() => {
  app.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
