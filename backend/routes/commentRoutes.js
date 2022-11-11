const express = require("express");
const api = express.Router();
const commentController = require("../controllers/commentController");

//post
api.post("/comment", commentController.createComment);

//put
api.put("/comment/update/:id", commentController.updateComment);

//delete
api.delete("/comment/delete/:id", commentController.deleteComment);

//get
api.get("/comment/find/:id", commentController.getComment);
api.get("/comments", commentController.getComments);

module.exports = api;
