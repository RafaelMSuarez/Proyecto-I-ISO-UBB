const Post = require("../models/post.js");

const createPost = (req, res) => {
  const { user, title, desc, likes, dislike, reports, numComments } = req.body;
  const newPost = new Post({
    user,
    title,
    desc,
    likes,
    dislike,
    reports,
    numComments,
  });
  newPost.save((error, post) => {
    if (error) {
      return res
        .status(400)
        .send({ message: "No se ha podido crear la publicación" });
    }
    return res.status(201).send(post);
  });
};

const getPosts = (req, res) => {
  Post.find({}, (error, posts) => {
    if (error) {
      return res
        .status(400)
        .send({ message: "No se pudo realizar la busqueda" });
    }
    if (posts.length === 0) {
      return res
        .status(404)
        .send({ message: "No se encontraron publicaciones" });
    }
    return res.status(200).send(posts);
  });
};

const updatePost = (req, res) => {
  const { id } = req.params;
  Post.findByIdAndUpdate(id, req.body, (error, post) => {
    if (error) {
      return res
        .status(400)
        .send({ message: "No se pudo actualizar la publicación" });
    }
    if (!post) {
      return res.status(404).send({ message: "No se encontro la publicación" });
    }
    return res.status(200).send({ message: "Publicación modificado" });
  });
};

const deletePost = (req, res) => {
  const { id } = req.params;
  Post.findByIdAndDelete(id, (error, post) => {
    if (error) {
      return res
        .status(400)
        .send({ message: "No se ha podido eliminar la publicación" });
    }
    if (!post) {
      return res
        .status(404)
        .send({ message: "No se ha podido encontrar la publicación" });
    }
    return res
      .status(200)
      .send({ message: "Se ha eliminado la publicación de forma correcta" });
  });
};

const getPost = (req, res) => {
  const { id } = req.params;
  Post.findById(id, (error, post) => {
    if (error) {
      return res
        .status(400)
        .send({ message: "No se ha podido encontrar la publicación" });
    }
    if (!post) {
      return res
        .status(404)
        .send({ message: "No se ha podido encontrar la publicación" });
    }
    return res.status(200).send(post);
  });
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getPosts,
};
