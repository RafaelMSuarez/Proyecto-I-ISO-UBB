const express = require("express");
const api = express.Router();
const userController = require("../controllers/userController");

//post
api.post("/user", userController.createUser);

//put
api.put("/user/update/:id", userController.updateUser);

//delete
api.delete("/user/delete/:id", userController.deleteUser);

//get
api.get("/user/find/:id", userController.getUser);
api.get("/users", userController.getUsers);

module.exports = api;
