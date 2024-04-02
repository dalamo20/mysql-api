const mysql = require("mysql");
const drinkQ = require("./queries/drinks.queries");
const orderQ = require("./queries/orders.queries");
const authQ = require("./queries/orders.queries");

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

  con.query(drinkQ.CREATE_DRINKS_TABLE, function (err, result) {
    if (err) throw err;
    console.log("Drinks table created or exists already!");
  });

  con.query(orderQ.CREATE_ORDERS_TABLE, function (err, result) {
    if (err) throw err;
    console.log("Orders table created or exists already!");
  });

  con.query(authQ.CREATE_USERS_TABLE, function (err, result) {
    if (err) throw err;
    console.log("Users table created or exists already!");
  });
});

module.exports = con;
