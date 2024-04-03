const express = require("express");
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const verifyToken = require("../middleware/auth.middleware");
const userRoutes = express.Router();

userRoutes.get("/user", userController.getUser);
userRoutes.post("/user/update", verifyToken, authController.updateUser);
userRoutes.post("/user/delete", verifyToken, authController.deleteUser);

module.exports = userRoutes;
