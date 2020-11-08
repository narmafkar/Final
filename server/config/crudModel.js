var orm = require("../config/orm.js");

var crudModel = {
  create: function (cols, vals, cb) {
    orm.create("information", cols, vals, function (res) {
      cb(res);
    });
  },

  update: function (objColVals, condition, cb) {
    orm.update("information", objColVals, condition, function (res) {
      cb(res);
    });
  },

  delete: function (condition, cb) {
    orm.delete("information", condition, function (res) {
      cb(res);
    });
  },
};

module.exports = crudModel;
