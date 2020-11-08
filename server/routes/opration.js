const paginate = require("jw-paginate");
var crudModel = require("../config/crudModel.js");
var moment = require("jalali-moment");
const bcrypt = require("bcrypt-nodejs");

var final = [];

module.exports = {
  postUserUseEffect: (req, res) => {
    const { transferType } = req.body;
    let query = "SELECT * FROM `information` WHERE 1=1";
    if (transferType === "1" || transferType === "3" || transferType === "4") {
      query += " AND (transferType = " + transferType + ")";
    }
    db.query(query, (err, items) => {
      if (err) {
        res.redirect("/");
      }
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize);
      const pager = paginate(items.length, page, pageSize);
      const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
      res.json({ items, pager, pageOfItems });
    });
  },
  getTableData: (req, res) => {
    let query = "SELECT * FROM `information`";
    db.query(query, (err, items) => {
      if (err) {
        throw err;
      }
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize);
      const pager = paginate(items.length, page, pageSize);
      const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
      res.json({ items, pager, pageOfItems });
    });
  },

  postUser: (req, res) => {
    const data = req.body;
    (selectedOption = data.allSelectedOptions),
      (textBox = data.allTextBox),
      (dcmTypeObj = selectedOption.dcmType),
      (transferTypeObj = selectedOption.transferType),
      (estateTypeObj = selectedOption.estateType),
      (regionObj = selectedOption.region),
      (ageObj = selectedOption.age),
      (roomsObj = selectedOption.rooms),
      (floorObj = selectedOption.floor),
      (optionsObj = selectedOption.options);
    const getSelect = (fieldName, obj) => {
      var text = "";
      for (index = 0; index < obj.length; index++) {
        text += obj[index].value;
        if (index < obj.length - 1) text += " OR " + fieldName + " = ";
      }
      return text;
    };
    if (dcmTypeObj != null) dcmType = getSelect("dcmType", dcmTypeObj);
    if (transferTypeObj != null)
      transferType = getSelect("transferType", transferTypeObj);
    if (estateTypeObj != null)
      estateType = getSelect("estateType", estateTypeObj);
    if (regionObj != null) region = getSelect("region", regionObj);
    if (ageObj != null) age = getSelect("age", ageObj);
    if (roomsObj != null) rooms = getSelect("rooms", roomsObj);
    if (floorObj != null) floor = getSelect("floor", floorObj);
    if (optionsObj != null) options = getSelect("options", optionsObj);

    let query = "SELECT * FROM `information` WHERE 1=1";

    if (selectedOption.dcmType && selectedOption.dcmType != "") {
      query += " AND (dcmType = " + dcmType + ")";
    }
    if (selectedOption.transferType && selectedOption.transferType != "") {
      query += " AND (transferType = " + transferType + ")";
    }
    if (selectedOption.estateType && selectedOption.estateType != "") {
      query += " AND (estateType = " + estateType + ")";
    }
    if (selectedOption.region && selectedOption.region != "") {
      query += " AND (region = " + region + ")";
    }
    if (selectedOption.age && selectedOption.age != "") {
      query += " AND (age = " + age + ")";
    }
    if (selectedOption.rooms && selectedOption.rooms != "") {
      query += " AND (rooms = " + rooms + ")";
    }
    if (selectedOption.floor && selectedOption.floor != "") {
      query += " AND (floor = " + floor + ")";
    }
    if (selectedOption.options && selectedOption.options != "") {
      query += " AND (options = " + options + ")";
    }
    if (textBox.priceLow + textBox.priceHigh != 0) {
      query +=
        " AND (price >= " +
        textBox.priceLow +
        " AND price <= " +
        textBox.priceHigh +
        ")";
    }
    if (textBox.mortgagesLow + textBox.mortgagesHigh != 0) {
      query +=
        " AND (mortgages >= " +
        textBox.mortgagesLow +
        " AND mortgages <= " +
        textBox.mortgagesHigh +
        ")";
    }
    if (textBox.rentLow + textBox.rentHigh != 0) {
      query +=
        " AND (rent >= " +
        textBox.rentLow +
        " AND rent <= " +
        textBox.rentHigh +
        ")";
    }
    if (textBox.areaLow + textBox.areaHigh != 0) {
      query +=
        " AND (area >= " +
        textBox.areaLow +
        " AND area <= " +
        textBox.areaHigh +
        ")";
    }
    if (textBox.address) {
      query += " AND (address = " + textBox.address + ")";
    }

    db.query(query, (err, items) => {
      if (err) {
        res.redirect("/");
      }
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize);
      const pager = paginate(items.length, page, pageSize);
      const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
      res.json({ items, pager, pageOfItems });
    });
  },

  postUser2: (req, res) => {
    var today = moment().format("YYYY/MM/DD");
    var nowDate = moment(today, "YYYY/MM/DD");

    if (req.user) {
      const id = req.body.id;
      const clientId = req.user.id;
      // let queryStatus = "SELECT * FROM `status` WHERE clientId = " + clientId;
      let queryStatus =
        "SELECT * FROM `status` WHERE clientId = " +
        clientId +
        " AND TransactionCode <> 'Pending' ORDER BY id DESC LIMIT 1";
      db.query(queryStatus, (err, result) => {
        if (result) {
          rows = JSON.parse(JSON.stringify(result));
          if (rows[0]) var expDate = rows[0].expDate;
          if (nowDate.isBefore(moment(expDate, "YYYY/MM/DD"), "day")) {
            let query = "SELECT * FROM `information` WHERE id = " + id;
            db.query(query, (err, result) => {
              final = result;
              res.json({
                result: final,
                status: "true",
              });
            });
          } else {
            res.json({
              message:
                "موجودی حساب شما کافی نمیباشد.لطفا حساب خود را تمدید نمایید",
              status: "false",
              mode: "payment",
            });
          }
        }
      });
    } else {
      res.json({
        message: "لطفا برای مشاهده مشخصات مالک وارد حساب خود شوید",
        status: "false",
        mode: "login",
      });
    }
  },

  postTableData: (req, res) => {
    const {
      id,
      region,
      estateType,
      transferType,
      dcmType,
      elevator,
      parking,
      dateInsert,
      floors,
      rooms,
      area,
      mortgages,
      rent,
      price,
      age,
      units,
      floor,
      cabinets,
      covering,
      tell,
      cooler,
      heater,
      address,
      direction,
      wall,
      description,
      malek,
    } = req.body;
    crudModel.create(
      [
        "region",
        "estateType",
        "transferType",
        "dcmType",
        "floors",
        "elevator",
        "parking",
        "dateInsert",
        "floor",
        "rooms",
        "area",
        "mortgages",
        "rent",
        "price",
        "age",
        "units",
        "cabinets",
        "covering",
        "tell",
        "cooler",
        "heater",
        "address",
        "direction",
        "wall",
        "description",
        "malek",
      ],
      [
        region,
        estateType,
        transferType,
        dcmType,
        floors,
        elevator,
        parking,
        dateInsert,
        floor,
        rooms,
        area,
        mortgages,
        rent,
        price,
        age,
        units,
        cabinets,
        covering,
        tell,
        cooler,
        heater,
        address,
        direction,
        wall,
        description,
        malek,
      ],

      function (result) {
        const query =
          "SELECT * FROM `information` WHERE id = " + result.insertId;
        db.query(query, (err, item) => {
          if (err) {
            return res.status(400).json({ dbError: "db error" });
          }
          res.json(item);
        });
      }
    );
  },
  putTableData: (req, res) => {
    const {
      id,
      region,
      estateType,
      transferType,
      dcmType,
      elevator,
      parking,
      dateInsert,
      floors,
      rooms,
      area,
      mortgages,
      rent,
      price,
      age,
      units,
      floor,
      cabinets,
      covering,
      tell,
      cooler,
      heater,
      address,
      direction,
      wall,
      description,
      malek,
    } = req.body;
    const condition = "id = " + id;

    crudModel.update(
      {
        id: id,
        region: region,
        estateType: estateType,
        transferType: transferType,
        dcmType: dcmType,
        elevator: elevator,
        parking: parking,
        dateInsert: dateInsert,
        floors: floors,
        rooms: rooms,
        area: area,
        mortgages: mortgages,
        rent: rent,
        price: price,
        age: age,
        units: units,
        floor: floor,
        cabinets: cabinets,
        covering: covering,
        tell: tell,
        cooler: cooler,
        heater: heater,
        address: address,
        direction: direction,
        wall: wall,
        description: description,
        malek: malek,
      },
      condition,
      function (result) {
        const query = "SELECT * FROM `information` WHERE id = " + id;
        db.query(query, (err, item) => {
          if (err) {
            return res.status(400).json({ dbError: "db error" });
          }
          res.json(item);
        });
      }
    );
  },
  deleteTableData: (req, res, db) => {
    const { id } = req.body;
    const condition = "id = " + id;

    crudModel.delete(condition, function (result) {
      if (result.affectedRows == 0) {
        return res.status(404).json({ dbError: "db error" });
      } else {
        res.json({ delete: "true" });
      }
    });
  },

  forget: (req, res) => {
    const username = req.body.username;
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    const newPassword = bcrypt.hashSync(randomNumber, null, null);
    let query = "SELECT * FROM `users` WHERE username = '" + username + "'";
    db.query(query, (err, fields) => {
      console.log(fields);
      if (fields[0]) {
        let query =
          "UPDATE `users` SET password = '" +
          newPassword +
          "' WHERE username = " +
          username;
        db.query(query, (err, fields) => {
          res.send({
            status: true,
            newPass: randomNumber,
            mode: "success",
            message: "رمز عبور جدید برای شما پیامک میشود",
          });
          console.log(randomNumber);
        });
      } else {
        res.send({
          status: false,
          mode: "warning",
          message: "کاربر با این مشخصات وجود ندارد",
        });
      }
    });
  },

  submitChangePassword: (req, res) => {
    const username = req.user.username;
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const hashNewPassword = bcrypt.hashSync(newPassword, null, null);

    if (newPassword) {
      if (newPassword === confirmPassword) {
        let query = "SELECT * FROM `users` WHERE username = " + username;
        db.query(query, (err, fields) => {
          const hashPassword = fields[0].password;
          bcrypt.compare(oldPassword, hashPassword, function (err, response) {
            if (response) {
              let query =
                "UPDATE `users` SET password = '" +
                hashNewPassword +
                "' WHERE username = " +
                username;
              db.query(query, (err, fields) => {
                console.log(query);
              });
              res.send({
                status: true,
                mode: "success",
                message: "رمز عبور با موفقیت تغییر داده شد",
              });
            } else {
              res.send({
                status: false,
                mode: "warning",
                message: "رمز عبور فعلی صحیح نمیباشد",
              });
            }
          });
          if (err) console.log("err is: ", err);
        });
      } else {
        res.send({
          mode: "warning",
          message: "تکرار رمز عبور صحیح نمیباشد",
        });
      }
    } else {
      res.send({
        mode: "warning",
        message: "رمز عبور جدید را وارد کنید",
      });
    }
  },
};
