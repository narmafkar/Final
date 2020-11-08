const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../models");
const bcrypt = require("bcrypt-nodejs");

// passport setup for the "Local Strategy". If you are using username instead of email, don't include { usernameField: 'email' }.
passport.use(
  "local-login",
  new LocalStrategy(
    { usernameField: "username", passReqToCallback: true },
    function (req, username, password, done) {
      // check for user in database
      db.users
        .findOne({
          where: {
            username: username,
          },
        })
        .then((user) => {
          // if user was not found return false for user and pass an error message
          if (!user)
            return done(
              null,
              false,
              req.flash("loginMessage", "کاربر وجود ندارد.ابتدا ثبت نام کنید")
            );
          // compare the password with the "hashed" password"

          if (!bcrypt.compareSync(password, user.password))
            return done(
              null,
              false,
              req.flash("loginMessage", "رمز عبور اشتباه است")
            );
          return done(null, user);
        });
    }
  )
);

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      // by default, local strategy uses username and password, we will override with email
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true, // allows us to pass back the entire request to the callback
    },
    function (req, username, password, done) {
      db.users.findAll({ where: { username: username } }).then((data) => {
        if (data.length) {
          return done(
            null,
            false,
            req.flash("signupMessage", "کاربر وجود دارد")
          );
        } else {
          // if there is no user with that username
          // create the user
          var newUserMysql = {
            username: username,
            password: bcrypt.hashSync(password, null, null), // use the generateHash function in our user model
          };

          db.users
            .create(newUserMysql)
            .then((data) => {
              newUserMysql.id = data.id;

              return done(
                null,
                newUserMysql,
                req.flash("signupMessage", "ثبت نام با موفقیت انجام شد")
              );
            })
            .catch((err) => {
              message: err.message ||
                "Some error occurred while creating the Tutorial.";
            });
        }
      });
    }
  )
);

// passport boiler plate to serialize and deserialize user
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  const user = await db.users.findOne({ where: { id: id } });
  done(null, user);
});
module.exports = passport;
