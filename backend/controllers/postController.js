const Post = require("../models/post.js");
const User = require("../models/user.js");

//crea un post
const createPost = async (req, res) => {
  const { user, title, desc } = req.body;
  const newPost = new Post({
    user,
    title,
    desc,
  });
  Post.findOne({ title: newPost.title })
    .lean()
    .exec((err, post) => {
      if (err) {
        return res.status(403).send({ message: "Error de título" });
      }
      if (post) {
        return res.status(400).send({ message: "Título repetido" });
      }
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
          if (user.banned) {
            return res
              .status(403)
              .send({ message: "Usuario no disponible para publicar" });
          }
          if (user.numpost >= 5) {
            return res
              .status(404)
              .send({ message: "Número de publicaciones excedido" });
          }
          if (user.numpost < 5) {
            newPost.save(async (err, post) => {
              if (err) {
                console.log(err);
                return res
                  .status(400)
                  .send({ message: "No se ha podido crear la publicación" });
              } else {
                await User.findByIdAndUpdate(user._id, {
                  $inc: { numpost: 1 },
                });
                return res.status(200).send(post);
              }
            });
          }
        });
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
    return res.status(200).send({ message: "Publicación modificada" });
  });
};

//elimina un post
const deletePost = (req, res) => {
  const { postId } = req.body;
  Post.findByIdAndDelete(postId, async (err, post) => {
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

//obtiene todos los post sin reportes mayores a 3
const getPosts = (req, res) => {
  Post.find({ numReports: { $lte: "3" } })
    .populate("user")
    .sort({ numLikes: -1 })
    .exec((err, posts) => {
      if (err) {
        return res
          .status(400)
          .send({ message: "No se pudo realizar la busqueda" });
      }
      if (posts.length === 0) {
        return res.status(200).send([]);
      }
      return res.status(200).send(posts);
    });
};

//obtiene todos los post de un usuario
const getUserPosts = (req, res) => {
  const { userId } = req.params;
  User.findById(userId, (err, user) => {
    if (err) {
      return res.status(400).send({ message: "Error al encontrar usuario" });
    }
    if (!user) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }
    Post.find({ user: user._id })
      .populate("user")
      .sort({ numLikes: -1 })
      .exec((err, posts) => {
        if (err) {
          return res
            .status(400)
            .send({ message: "No se pudo realizar la busqueda" });
        }
        if (posts.length === 0) {
          return res.status(200).send([]);
        }
        return res.status(200).send(posts);
      });
  });
};

//obtiene todos los post con reportes mayores a 1
const getReportedPosts = (req, res) => {
  Post.find({ numReports: { $gte: "1" } })
    .populate("user")
    .sort({ numReports: -1 })
    .exec((err, posts) => {
      if (err) {
        return res
          .status(400)
          .send({ message: "No se pudo realizar la busqueda" });
      }
      if (posts.length === 0) {
        return res.status(200).send([]);
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
  getUserPosts,
  getReportedPosts,
};
