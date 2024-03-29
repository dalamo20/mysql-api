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
  //get all drink items
  con.query(drinkQ.ALL_DRINKS, function (err, drinkRes) {
    if (err) {
      res.send(err);
      return;
    }
    //storing the price of the drink item in a var newDrink if it exists
    const drinkId = parseInt(req.body.drink_id);
    const newDrink = drinkRes.find((drink) => drink.id === drinkId);
    console.log("New Drink:", newDrink);
    if (!newDrink) {
      res.status(404).json({ message: "Drink is not on the menu." });
      return;
    }
    console.log("Price of updated drink:", newDrink.price);

    //total price using updated drink price and quantity
    const total_price = newDrink.price * req.body.quantity;
    //create order and use variable above for dynamic pricing in place of req.body.total_price
    con.query(
      queries.INSERT_ORDER,
      [req.body.drink_id, req.body.quantity, total_price],
      function (err, result) {
        if (err) {
          res.send(err);
          return;
        }
        console.log("Order created: " + result);
        res.json({
          message: "Number of records inserted: " + result.affectedRows,
        });
      }
    );
  });
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

      //debugging: viewing drink id's available in drinkRes obj
      drinkRes.forEach((drink) => console.log("Drink ID:", drink.id));

      //Bug found/fixed: I had to parse the drink_id below
      const drinkId = parseInt(req.body.drink_id);
      const updatedDrink = drinkRes.find((drink) => drink.id === drinkId);
      console.log("Updated Drink:", updatedDrink);
      if (!updatedDrink) {
        res.status(404).json({ message: "Drink is not on the menu." });
        return;
      }
      console.log("price of updated drink:", updatedDrink.price);

      //total price using updated drink price and quantity
      const total_price = updatedDrink.price * req.body.quantity;

      //order is updated with new total price var from above
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
