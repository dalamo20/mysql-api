const mysql = require("mysql");
const queries = require("./queries/drinks.queries");

const host = process.env.DB_HOST || "localhost";
const user = process.env.DB_USER || "root";
const password = process.env.DB_PASS || "root";
const database = process.env.DB_DATABASE || "bardb";

const con = mysql.createConnection({
  host,
  user,
  password,
  database,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  con.query(queries.CREATE_DRINKS_TABLE, function (err, result) {
    if (err) throw err;
    console.log("Drinks table created or exists already!");
  });

  con.query(queries.CREATE_ORDERS_TABLE, function (err, result) {
    if (err) throw err;
    console.log("Orders table created or exists already!");
  });
});

module.exports = con;
