const express = require("express");
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const verifyToken = require("../middleware/auth.middleware");
const userRoutes = express.Router();

userRoutes.get("/", userController.getUser);
userRoutes.post("/update", verifyToken, authController.updateUser);
userRoutes.post("/delete", verifyToken, authController.deleteUser);

module.exports = userRoutes;
