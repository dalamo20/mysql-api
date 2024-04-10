const {
  getAllDrinks,
  createDrink,
  getDrink,
  updateDrink,
  deleteDrink,
} = require("../controllers/drinks.controller");
const express = require("express");

const drinksRoutes = express.Router();

drinksRoutes.get("/", getAllDrinks).post("/", createDrink);

drinksRoutes
  .get("/:drinkId", getDrink) // GET http://localhost:3000/drinks/1
  .put("/:drinkId", updateDrink)
  .delete("/:drinkId", deleteDrink);

module.exports = drinksRoutes;
