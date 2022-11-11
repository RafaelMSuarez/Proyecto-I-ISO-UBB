const express = require("express");
const api = express.Router();
const commentController = require("../controllers/commentController");

api.post("/comment", commentController.createComment);
api.put("/comment/update/:id", commentController.updateComment);
api.delete("/comment/delete/:id", commentController.deleteComment);
api.get("/comment/search/:id", commentController.getComment);
api.get("/comments", commentController.getComments);

module.exports = api;
