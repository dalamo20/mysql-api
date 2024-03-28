const con = require("../db-config");
const queries = require("../queries/drinks.queries");

/* Drinks */
exports.getAllDrinks = function (req, res) {
  con.query(queries.ALL_DRINKS, function (err, result, fields) {
    if (err) {
      res.send(err);
    }
    console.log("Take a look at our menu.");
    res.json(result);
  });
};

exports.createDrink = function (req, res) {
  con.query(
    queries.INSERT_DRINK,
    [req.body.name, req.body.price],
    function (err, result) {
      if (err) {
        res.send(err);
      }
      console.log("Drink added to the menu: " + result);
      res.json({
        message: "Number of records inserted: " + result.affectedRows,
      });
    }
  );
};

exports.getDrink = function (req, res) {
  con.query(queries.SINGLE_DRINK, [req.params.drinkId], function (err, result) {
    if (err) {
      res.send(err);
    }
    console.log("Here is the drink item on the menu.");
    res.json(result);
  });
};

exports.updateDrink = function (req, res) {
  con.query(
    queries.UPDATE_DRINK,
    [req.body.name, req.body.price, req.params.drinkId],
    function (err, data) {
      if (err) {
        res.send(err);
      }
      console.log("Updating our menu.");
      res.json({
        data,
      });
    }
  );
};

exports.deleteDrink = function (req, res) {
  con.query(queries.DELETE_DRINK, [req.params.drinkId], function (err) {
    if (err) {
      res.send(err);
    }
    res.json({ message: "Drink is off the menu!" });
  });
};

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
  con.query(
    queries.INSERT_ORDER,
    [req.body.drink_id, req.body.quantity, req.body.total_price],
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
    queries.SINGLE_DRINK,
    [req.body.drink_id],
    function (err, drinkRes) {
      if (err) {
        res.send(err);
        return;
      }

      const total_price = drinkRes[0].price * req.body.quantity;

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
          res.json({
            message: "Order updated successfully.",
          });
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
