const {
  getAllDrinks,
  createDrink,
  getDrink,
  updateDrink,
  deleteDrink,
} = require("../controllers/drinks.controller");
const express = require("express");
const canAccess = require("../middleware/auth.middleware");

const drinksRoutes = express.Router();

drinksRoutes
  .get("/", canAccess, getAllDrinks)
  .post("/", canAccess, createDrink);

drinksRoutes
  .get("/:drinkId", canAccess, getDrink) // GET http://localhost:3000/drinks/1
  .put("/:drinkId", canAccess, updateDrink)
  .delete("/:drinkId", canAccess, deleteDrink);

module.exports = drinksRoutes;
