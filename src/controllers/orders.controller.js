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

exports.getAllOrders = async (req, res) => {
  //establish a connection
  const con = await connection().catch((err) => {
    throw err;
  });
  //query all orders
  const orders = await query(con, ALL_ORDERS).catch((err) => {
    res.send(err);
  });

  if (orders.length) {
    res.json(orders);
  }
};

exports.createOrder = async (req, res) => {
  const con = await connection().catch((err) => {
    throw err;
  });
  const drinkRes = await query(con, ALL_DRINKS).catch((err) => {
    throw err;
  });
  const drinkId = parseInt(req.body.drink_id);
  const newDrink = drinkRes.find((drink) => drink.id === drinkId);
  if (!newDrink) {
    return res.status(404).json({ message: "Drink is not on the menu." });
  }
  const total_price = newDrink.price * req.body.quantity;
  const result = await query(con, INSERT_ORDER, [
    req.body.drink_id,
    req.body.quantity,
    total_price,
  ]).catch((err) => {
    throw err;
  });
  if (result.affectedRows === 1) {
    res.json({
      message: "Order created",
    });
  }
};

exports.getOrder = async (req, res) => {
  const con = await connection().catch((err) => {
    throw err;
  });

  const drink = await query(con, SINGLE_ORDER, [req.params.orderId]).catch(
    (err) => {
      res.send(err);
    }
  );

  if (drink.length) {
    res.json(drink);
  }
};

exports.updateOrder = async (req, res) => {
  const con = await connection().catch((err) => {
    throw err;
  });
  const drinkRes = await query(con, ALL_DRINKS).catch((err) => {
    throw err;
  });
  const drinkId = parseInt(req.body.drink_id);
  const updatedDrink = drinkRes.find((drink) => drink.id === drinkId);
  if (!updatedDrink) {
    return res.status(404).json({ message: "Drink is not on the menu." });
  }
  const total_price = updatedDrink.price * req.body.quantity;
  const result = await query(con, UPDATE_ORDER, [
    req.body.drink_id,
    req.body.quantity,
    total_price,
    req.params.orderId,
  ]).catch((err) => {
    throw err;
  });
  if (result.affectedRows === 1) {
    res.json({ message: "Order updated" });
  } else {
    res.status(404).json({ message: "Order not found" });
  }
};

exports.deleteOrder = async (req, res) => {
  const con = await connection().catch((err) => {
    throw err;
  });

  const result = await query(con, DELETE_ORDER, [req.params.orderId]).catch(
    (err) => {
      res.send(err);
    }
  );

  if (result.affectedRows === 1) {
    res.json({
      message: "Order deleted!",
    });
  }
};
