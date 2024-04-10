const mysql = require("mysql");
const { CREATE_DRINKS_TABLE } = require("./queries/drinks.queries");
const { CREATE_ORDERS_TABLE } = require("./queries/orders.queries");
const { CREATE_USERS_TABLE } = require("./queries/user.queries");
const query = require("./utils/query");

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

const connection = async () =>
  new Promise((resolve, reject) => {
    const con = mysql.createConnection({
      host,
      user,
      password,
      database,
    });

    con.connect((err) => {
      if (err) {
        reject(err);
        return;
      }
    });

    resolve(con);
  });

(async () => {
  const _con = await connection().catch((err) => {
    throw err;
  });

  const userTableCreated = await query(_con, CREATE_USERS_TABLE).catch(
    (err) => {
      console.log(err);
    }
  );

  const drinksTableCreated = await query(_con, CREATE_DRINKS_TABLE).catch(
    (err) => {
      console.log(err);
    }
  );

  const ordersTableCreated = await query(_con, CREATE_ORDERS_TABLE).catch(
    (err) => {
      console.log(err);
    }
  );

  if (!!userTableCreated && !!ordersTableCreated && !!drinksTableCreated) {
    console.log("Tables Created!");
  }
})();

module.exports = connection;
