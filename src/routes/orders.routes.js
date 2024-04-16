const {
  getAllOrders,
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orders.controller");
const express = require("express");
const canAccess = require("../middleware/auth.middleware");

const ordersRoutes = express.Router();

ordersRoutes
  .get("/", canAccess, getAllOrders)
  .post("/", canAccess, createOrder);

ordersRoutes
  .get("/:orderId", canAccess, getOrder) // GET http://localhost:3000/api/orders/1
  .put("/:orderId", canAccess, updateOrder)
  .delete("/:orderId", canAccess, deleteOrder);

module.exports = ordersRoutes;
