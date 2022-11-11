const express = require('express');
const api = express.Router();
const postController = require('../controllers/postController');

api.post("/post", postController.createPost);
api.put("/post/update/:id", postController.updatePost);
api.delete("/post/delete/:id", postController.deletePost);
api.get("/post/search/:id", postController.getPost);
api.get("/posts", postController.getPosts);

module.exports = api;
