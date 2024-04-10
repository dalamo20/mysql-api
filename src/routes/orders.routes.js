const {
  getAllOrders,
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orders.controller");
const express = require("express");

const ordersRoutes = express.Router();

ordersRoutes.get("/", getAllOrders).post("/", createOrder);

ordersRoutes
  .get("/:orderId", getOrder) // GET http://localhost:3000/api/orders/1
  .put("/:orderId", updateOrder)
  .delete("/:orderId", deleteOrder);

module.exports = ordersRoutes;
