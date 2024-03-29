const controllers = require("../controllers/drinks.controller");
const express = require("express");

const drinksRoutes = express.Router();

drinksRoutes
  .get("/", controllers.getAllDrinks)
  .post("/", controllers.createDrink);

drinksRoutes
  .get("/:drinkId", controllers.getDrink) // GET http://localhost:3000/drinks/1
  .put("/:drinkId", controllers.updateDrink)
  .delete("/:drinkId", controllers.deleteDrink);

module.exports = drinksRoutes;
