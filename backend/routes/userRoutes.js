const express = require("express");
const api = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");

//post
api.post("/user", userController.createUser);
api.post("/user/login", userController.login);

//put
api.put("/user/update/:id", userController.updateUser);

//delete
api.delete("/user/delete/:id", userController.deleteUser);

//get
api.get("/user/find/:id", userController.getUser);
api.get("/users", userController.getUsers);
api.get("/checkToken", auth.auth, userController.checkToken);
api.get("/user/logout", auth.auth, userController.logout);
api.get("/user/rut/:rut", userController.getUserRUT);

module.exports = api;
