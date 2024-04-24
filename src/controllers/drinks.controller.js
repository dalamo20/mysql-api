const mysql = require("mysql");
const connection = require("../db-config");
const {
  ALL_DRINKS,
  SINGLE_DRINK,
  INSERT_DRINK,
  UPDATE_DRINK,
  DELETE_DRINK,
} = require("../queries/drinks.queries");
const query = require("../utils/query");
const { serverError } = require("../utils/handlers");

/* Drinks */
exports.getAllDrinks = async (req, res) => {
  //establish a connection
  const con = await connection().catch((err) => {
    throw err;
  });
  //query all drinks
  const drinks = await query(con, ALL_DRINKS(req.user.id), []).catch(
    serverError(res)
  );
  // [] === true, 0 === false
  if (!drinks.length) {
    return res.status(200).json({ msg: "No drinks available for this user." });
  }
  res.json(drinks);
};

exports.createDrink = async (req, res) => {
  // Verify valid token
  const user = req.user;

  if (user.id) {
    const con = await connection().catch((err) => {
      throw err;
    });

    const drinkName = mysql.escape(req.body.name);
    const drinkPrice = mysql.escape(req.body.price);
    const result = await query(
      con,
      INSERT_DRINK(user.id, drinkName, drinkPrice)
    ).catch(serverError(res));

    if (result.affectedRows !== 1) {
      res.status(500).json({ msg: `Unable to add drink: ${req.body.name}` });
    }
    //this should get the new drink with its id
    const newDrink = await query(
      con,
      SINGLE_DRINK(user.id, result.insertId)
    ).catch(serverError(res));

    if (!newDrink.length) {
      res.status(400).json({ msg: "Failed to fetch the newly created drink." });
    }

    res.json({ msg: "Drink added to the menu!", drink: newDrink[0] });
  }
};

exports.getDrink = async (req, res) => {
  const con = await connection().catch((err) => {
    throw err;
  });

  const drink = await query(
    con,
    SINGLE_DRINK(req.user.id, req.params.drinkId)
  ).catch(serverError(res));

  if (!drink.length) {
    res.status(400).json({ msg: "No drinks available for this user." });
  }
  res.json(drink);
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

exports.updateDrink = async (req, res) => {
  const con = await connection().catch((err) => {
    throw err;
  });

  const values = _buildValuesString(req);

  const result = await query(
    con,
    UPDATE_DRINK(req.user.id, req.params.drinkId, values)
  ).catch(serverError(res));

  if (result.affectedRows !== 1) {
    res.status(500).json({ msg: `Unable to update drink: '${req.body.name}'` }); // keepin as name instead drink_name
  }
  res.json(result);
};

exports.deleteDrink = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });

  // query delete drink
  const result = await query(
    con,
    DELETE_DRINK(req.user.id, req.params.drinkId)
  ).catch(serverError(res));

  if (result.affectedRows !== 1) {
    res
      .status(500)
      .json({ msg: `Unable to delete drink at: ${req.params.drinkId}` });
  }
  res.json({ msg: "Drink taken off the menu." });
};
