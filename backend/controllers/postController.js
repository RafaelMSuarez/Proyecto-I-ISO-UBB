const Post = require("../models/post.js");
const User = require("../models/user.js");

//crea un post
const createPost = (req, res) => {
  const { user, title, desc, likes, dislikes, reports, numComments } = req.body;
  const newPost = new Post({
    user,
    title,
    desc,
    likes,
    dislikes,
    reports,
    numComments,
  });
  User.findById(user)
    .lean()
    .exec(async (err, user) => {
      if (err) {
        return res
          .status(400)
          .send({ message: "No se ha podido encontrar el usuario" });
      }
      if (!user) {
        return res
          .status(404)
          .send({ message: "No se ha podido encontrar el usuario" });
      }
      if (user.numpost >= 5) {
        return res
          .status(404)
          .send({ message: "Número de publicaciones excedido" });
      }
      if (user.numpost < 5) {
        await User.findByIdAndUpdate(user._id, { $inc: { numpost: 1 } });
        newPost.save(async (err, post) => {
          if (err) {
            return res
              .status(400)
              .send({ message: "No se ha podido crear la publicación" });
          }
          return res.status(201).send(post);
        });
      }
    });
};

//actualiza un post
const updatePost = (req, res) => {
  const { id } = req.params;
  Post.findByIdAndUpdate(id, req.body, (err, post) => {
    if (err) {
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

//elimina un post
const deletePost = (req, res) => {
  const { id } = req.params;
  Post.findByIdAndDelete(id, async (err, post) => {
    if (err) {
      return res
        .status(400)
        .send({ message: "No se ha podido eliminar la publicación" });
    }
    if (!post) {
      return res
        .status(404)
        .send({ message: "No se ha podido encontrar la publicación" });
    }
    await User.findByIdAndUpdate(post.user, { $inc: { numpost: -1 } });
    return res
      .status(200)
      .send({ message: "Se ha eliminado la publicación de forma correcta" });
  });
};

//obtiene un post por id
const getPost = (req, res) => {
  const { id } = req.params;
  Post.findById(id)
    .populate("user")
    .exec((err, post) => {
      if (err) {
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

//obtiene todos los post
const getPosts = (req, res) => {
  Post.find({})
    .populate("user")
    .sort({ likes: -1 })
    .exec((err, posts) => {
      if (err) {
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

//obtiene todos los post con reportes mayores a 1
const getReportedPosts = (req, res) => {
  Post.find({ reports: { $gte: "1" } })
    .populate("user")
    .sort({ reports: -1 })
    .exec((err, posts) => {
      if (err) {
        return res
          .status(400)
          .send({ message: "No se pudo realizar la busqueda" });
      }
      if (posts.length === 0) {
        return res
          .status(404)
          .send({ message: "No se encontraron publicaciones reportadas" });
      }
      return res.status(200).send(posts);
    });
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getPosts,
  getReportedPosts,
};
