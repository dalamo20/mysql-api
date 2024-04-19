const mysql = require("mysql");
const connection = require("../db-config");
const {
  ALL_ORDERS,
  INSERT_ORDER,
  UPDATE_ORDER,
  DELETE_ORDER,
  SINGLE_ORDER,
} = require("../queries/orders.queries");
const { ALL_DRINKS } = require("../queries/drinks.queries");
const query = require("../utils/query");
const { serverError } = require("../utils/handlers");

exports.getAllOrders = async (req, res) => {
  //establish a connection
  const con = await connection().catch((err) => {
    throw err;
  });
  //query all orders
  const orders = await query(con, ALL_ORDERS(req.user.id), []).catch(
    serverError(res)
  );

  if (!orders.length) {
    res.status(200).json({ msg: "No orders available for this user." });
  }
  res.json(orders);
};

exports.createOrder = async (req, res) => {
  //verify valid token
  const user = req.user;

  //middleware check
  if (user.id) {
    const con = await connection().catch((err) => {
      throw err;
    });

    const drinkRes = await query(con, ALL_DRINKS(req.user.id), []).catch(
      serverError(res)
    );

    const drinkId = parseInt(req.body.drink_id);
    const newDrink = drinkRes.find((drink) => drink.id === drinkId);
    if (!newDrink) {
      return res.status(404).json({ message: "Drink is not on the menu." });
    }

    const total_price = newDrink.price * req.body.quantity;
    const itemId = mysql.escape(req.body.drink_id);
    const quant = mysql.escape(req.body.quantity);

    const result = await query(
      con,
      INSERT_ORDER(user.id, itemId, quant, total_price)
    ).catch(serverError(res));

    if (result.affectedRows !== 1) {
      res
        .status(500)
        .json({ msg: `Unable to add order: ${req.body.drink_id}` });
    }
    res.json({ msg: "Order added to the menu!" });
  }
};

exports.getOrder = async (req, res) => {
  const con = await connection().catch((err) => {
    throw err;
  });

  const order = await query(
    con,
    SINGLE_ORDER(req.user.id, req.params.orderId)
  ).catch(serverError(res));

  if (!order.length) {
    res.status(400).json({ msg: "No orders available for this user." });
  }
  res.json(order);
};

const _buildValuesString = (req) => {
  const body = req.body;
  const values = Object.keys(body).map(
    // [name, status].map()
    (key) => `${key} = ${mysql.escape(body[key])}` // 'New 1 drink name'
  );

  // values.push(`created_date = NOW()`); // update current date and time
  values.join(", "); // make into a string
  return values;
};

exports.updateOrder = async (req, res) => {
  const con = await connection().catch((err) => {
    throw err;
  });

  const values = _buildValuesString(req);

  // query all drinks for the current user
  const drinkRes = await query(con, ALL_DRINKS(req.user.id), []).catch(
    serverError(res)
  );

  // find the drink to update based on the drink ID from drinks table
  const drinkId = parseInt(req.body.drink_id);
  const updatedDrink = drinkRes.find((drink) => drink.id === drinkId);

  if (!updatedDrink) {
    return res.status(404).json({ message: "Drink is not on the menu." });
  }

  const total_price = updatedDrink.price * req.body.quantity;

  // Perform update. total_price was not being passed into values.
  const result = await query(
    con,
    UPDATE_ORDER(req.user.id, req.params.orderId, values, total_price)
  ).catch(serverError(res));

  if (result.affectedRows !== 1) {
    return res
      .status(500)
      .json({ msg: `Unable to update order: '${req.params.orderId}'` });
  }
  res.json(result);
};

exports.deleteOrder = async (req, res) => {
  const con = await connection().catch((err) => {
    throw err;
  });

  const result = await query(
    con,
    DELETE_ORDER(req.user.id, req.params.orderId)
  ).catch(serverError(res));

  if (result.affectedRows !== 1) {
    res
      .status(500)
      .json({ msg: `Unable to delete order : ${req.params.drinkId}` });
  }
  res.json({ msg: "Order deleted successfully!" });
};
