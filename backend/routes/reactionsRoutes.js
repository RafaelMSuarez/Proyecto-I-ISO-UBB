const express = require("express");
const api = express.Router();
const reactionController = require("../controllers/reactionController");

//put
api.put("/post/darlike", reactionController.darLike);

//delete
api.delete("/post/quitarlike", reactionController.quitarLike);

//get
api.get("/post/likes", reactionController.verlikes);
api.get("/post/like", reactionController.getLike);

module.exports = api;
