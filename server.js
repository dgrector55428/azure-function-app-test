require("dotenv").config();
// require("msnodesqlv8");
var express = require("express");
var app = express();
const sql = require("mssql");

const config = {
  server: "msp-sql3",
  user: process.env.user,
  password: process.env.DB_PWD,
  port: 1433,
  database: "master",
  driver: "mssql",
  options: {
    encrypt: false,
  },
};

app.get("/", function (req, res) {
  sql.connect(config, function (err) {
    if (err) console.log("err", err);

    var request = new sql.Request();

    request.query(
      "select * from APP_IEX.dbo.Materials",
      function (err, recordset) {
        // console.log("recordset", recordset);
        if (err) console.log(err);
        res.send(recordset);
      }
    );
  });
});

app.get("/manufacturers", function (req, res) {
  sql.connect(config, function (err) {
    if (err) console.log("err", err);

    var request = new sql.Request();

    request.query(
      "select * from APP_IEX.dbo.TeamIT_Manufacturers",
      function (err, recordset) {
        if (err) console.log(err);
        res.send(recordset);
      }
    );
  });
});

var server = app.listen(process.env.PORT || 3000, function () {
  console.log("Server is running..");
});

// console.log(server);
