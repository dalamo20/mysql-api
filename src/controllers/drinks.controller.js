const connection = require("../db-config");
const {
  ALL_DRINKS,
  SINGLE_DRINK,
  INSERT_DRINK,
  UPDATE_DRINK,
  DELETE_DRINK,
} = require("../queries/drinks.queries");
const query = require("../utils/query");

/* Drinks */
exports.getAllDrinks = async (req, res) => {
  //establish a connection
  const con = await connection().catch((err) => {
    throw err;
  });
  //query all drinks
  const drinks = await query(con, ALL_DRINKS).catch((err) => {
    res.send(err);
  });

  if (drinks.length) {
    res.json(drinks);
  }
};

exports.createDrink = async (req, res) => {
  const con = await connection().catch((err) => {
    throw err;
  });

  const result = await query(con, INSERT_DRINK, [
    req.body.name,
    req.body.price,
  ]).catch((err) => {
    res.send(err);
  });

  if (result.affectedRows === 1) {
    res.json({
      message: "Drink added to the menu",
    });
  }
};

exports.getDrink = async (req, res) => {
  const con = await connection().catch((err) => {
    throw err;
  });

  const drink = await query(con, SINGLE_DRINK, [req.params.drinkId]).catch(
    (err) => {
      res.send(err);
    }
  );

  if (drink.length) {
    res.json(drink);
  }
};

exports.updateDrink = async (req, res) => {
  const con = await connection().catch((err) => {
    throw err;
  });

  const result = await query(con, UPDATE_DRINK, [
    req.body.name,
    req.body.price,
    req.params.drinkId,
  ]).catch((err) => {
    res.send(err);
  });

  if (result.affectedRows === 1) {
    res.json(result);
  }
};

exports.deleteDrink = async (req, res) => {
  const con = await connection().catch((err) => {
    throw err;
  });

  const result = await query(con, DELETE_DRINK, [req.params.drinkId]).catch(
    (err) => {
      res.send(err);
    }
  );

  if (result.affectedRows === 1) {
    res.json({
      message: "Drink deleted from the menu",
    });
  }
};
