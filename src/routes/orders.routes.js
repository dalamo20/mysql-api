const controllers = require("../controllers/orders.controller");
const express = require("express");

const ordersRoutes = express.Router();

ordersRoutes
  .get("/", controllers.getAllOrders)
  .post("/", controllers.createOrder);

ordersRoutes
  .get("/:orderId", controllers.getOrder) // GET http://localhost:3000/orders/1
  .put("/:orderId", controllers.updateOrder)
  .delete("/:orderId", controllers.deleteOrder);

module.exports = ordersRoutes;
