const express = require("express");
const api = express.Router();
const postController = require("../controllers/postController");

//post
api.post("/post", postController.createPost);

//put
api.put("/post/likepost/:id", postController.likePost);
api.put("/post/likemenospost/:id", postController.likeMenosPost);
api.put("/post/dislike/:id", postController.dislikePost);
api.put("/post/dislikemenospost/:id", postController.dislikeMenosPost);
api.put("/post/updatenumcomment/:id", postController.newComment)
api.put("/post/updatenumcommentdeleted/:id", postController.commentDeleted)
api.put("/post/update/:id", postController.updatePost);
api.put("/post/report/:id", postController.reportPost);

//delete
api.delete("/post/delete/:id", postController.deletePost);

//get
api.get("/post/find/:id", postController.getPost);
api.get("/posts", postController.getPosts);
api.get("/postsreported", postController.getReportedPosts);

module.exports = api;
