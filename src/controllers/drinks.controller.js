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
      res.json(data);
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
