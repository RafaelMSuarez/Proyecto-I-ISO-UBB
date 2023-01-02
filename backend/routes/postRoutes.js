const express = require("express");
const api = express.Router();
const postController = require("../controllers/postController");
const auth = require("../middlewares/auth");

//post
api.post("/post", postController.createPost);

//put
api.put("/post/update/:id", postController.updatePost);

//delete
api.delete("/post/delete", postController.deletePost);

//get
api.get("/post/find/:id", postController.getPost);
api.get("/posts", auth.auth, postController.getPosts);
api.get("/userposts/:userId", auth.auth, postController.getUserPosts);
api.get("/postsreported", postController.getReportedPosts);

module.exports = api;
