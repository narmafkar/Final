module.exports = function (sequelize, Sequelize) {
  var User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    officeName: {
      type: Sequelize.STRING,
    },
    officePhone: {
      type: Sequelize.STRING,
    },
    mobile: {
      type: Sequelize.STRING,
    },
  });

  return User;
};
