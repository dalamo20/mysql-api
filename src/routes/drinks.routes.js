const controllers = require("./controllers/drinks.controller");
const express = require("express");

const barRoutes = express.Router();

barRoutes
  .get("/drinks", controllers.getAllDrinks)
  .post("/drink", controllers.createDrink);

barRoutes
  .get("/:drinkId", controllers.getDrink) // GET http://localhost:3000/drinks/1
  .put("/:drinkId", controllers.updateDrink)
  .delete("/:drinkId", controllers.deleteDrink);

barRoutes
  .get("/orders", controllers.getAllOrders)
  .post("/order", controllers.createOrder);

barRoutes
  .get("/:orderId", controllers.getOrder) // GET http://localhost:3000/orders/1
  .put("/:orderId", controllers.updateOrder)
  .delete("/:orderId", controllers.deleteOrder);

module.exports = barRoutes;
