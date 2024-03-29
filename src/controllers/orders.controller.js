const con = require("../db-config");
const queries = require("../queries/orders.queries");
const drinkQ = require("../queries/drinks.queries");

/* Orders */
exports.getAllOrders = function (req, res) {
  con.query(queries.ALL_ORDERS, function (err, result, fields) {
    if (err) {
      res.send(err);
    }
    console.log("Bartender: 'Let's review tonight's orders.' ");
    res.json(result);
  });
};

exports.createOrder = function (req, res) {
  //get price of drinks from 'drinks' table
  con.query(
    drinkQ.ALL_DRINKS,
    // [req.params.drinkId],
    function (err, drinkRes) {
      if (err) {
        res.send(err);
        return;
      }

      const total_price = drinkRes[0].price * req.body.quantity;
      //subquery
      //create order and use variable above for dynamic pricing in place of req.body.total_price
      con.query(
        queries.INSERT_ORDER,
        [req.body.drink_id, req.body.quantity, total_price],
        function (err, result) {
          if (err) {
            res.send(err);
          }
          console.log("Order created: " + result);
          res.json({
            message: "Number of records inserted: " + result.affectedRows,
          });
        }
      );
    }
  );
};

exports.getOrder = function (req, res) {
  con.query(queries.SINGLE_ORDER, [req.params.orderId], function (err, result) {
    if (err) {
      res.send(err);
    }
    console.log("Let's review your order: ");
    res.json(result);
  });
};

exports.updateOrder = function (req, res) {
  //get price of drinks from 'drinks' table
  con.query(
    drinkQ.ALL_DRINKS,
    // [req.params.drinkId],
    function (err, drinkRes) {
      if (err) {
        res.send(err);
        return;
      }

      console.log("Drink Results:", drinkRes);
      console.log("Requested Drink ID:", req.body.drink_id);

      const updatedDrink = drinkRes.find(
        (drink) => drink.id === req.body.drink_id
      );
      if (!updatedDrink) {
        res.status(404).json({ message: "Drink not found" });
        return;
      }

      const total_price = updatedDrink.price * req.body.quantity;
      //subquery
      //update order and use variable above for dynamic pricing in place of req.body.total_price
      con.query(
        queries.UPDATE_ORDER,
        [req.body.drink_id, req.body.quantity, total_price, req.params.orderId],
        function (err, data) {
          if (err) {
            res.send(err);
            return;
          }
          console.log("I've updated your order.");
          res.json(data);
        }
      );
    }
  );
};

exports.deleteOrder = function (req, res) {
  con.query(queries.DELETE_ORDER, [req.params.orderId], function (err) {
    if (err) {
      res.send(err);
    }
    res.json({ message: "Order deleted!" });
  });
};
