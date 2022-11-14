const express = require("express");
const api = express.Router();
const postController = require("../controllers/postController");

//post
api.post("/post", postController.createPost);

//put
api.put("/post/update/:id", postController.updatePost);

//delete
api.delete("/post/delete/:id", postController.deletePost);

//get
api.get("/post/find/:id", postController.getPost);
api.get("/posts", postController.getPosts);
api.get("/postsreported", postController.getReportedPosts);

module.exports = api;
