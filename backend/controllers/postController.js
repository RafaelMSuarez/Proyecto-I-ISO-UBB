const Post = require("../models/post.js");

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
  newPost.save(async (err, post) => {
    if (err) {
      return res
        .status(400)
        .send({ message: "No se ha podido crear la publicación" });
    }
    return res.status(201).send(post);
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

//reporta un post
const reportPost = (req, res) => {
  const { id } = req.params;
  Post.findByIdAndUpdate(id, { $inc: { reports: 1 } }, (err, post) => {
    if (err) {
      return res
        .status(400)
        .send({ message: "No se pudo actualizar la publicación" });
    }
    if (!post) {
      return res.status(404).send({ message: "No se encontro la publicación" });
    }
    return res.status(200).send({ message: "Publicación reportada" });
  });
};

//elimina un post
const deletePost = (req, res) => {
  const { id } = req.params;
  Post.findByIdAndDelete(id, (err, post) => {
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

//da like a un post
const likePost = (req, res) => {
  const { id } = req.params;
  Post.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, post) => {
    if (err) {
      return res
        .status(400)
        .send({ message: "No se pudo actualizar la publicación" });
    }
    if (!post) {
      return res.status(404).send({ message: "No se encontro la publicación" });
    }
    return res.status(200).send({ message: "Like realizado" });
  });
};

//quita like a un post
const likeMenosPost = (req, res) => {
  const { id } = req.params;
  Post.findByIdAndUpdate(id, { $inc: { likes: -1 } }, (err, post) => {
    if (err) {
      return res
        .status(400)
        .send({ message: "No se pudo actualizar la publicación" });
    }
    if (!post) {
      return res.status(404).send({ message: "No se encontro la publicación" });
    }
    return res.status(200).send({ message: "Like quitado" });
  });
};

//da dislike a un post
const dislikePost = (req, res) => {
  const { id } = req.params;
  Post.findByIdAndUpdate(id, { $inc: { dislikes: 1 } }, (err, post) => {
    if (err) {
      return res
        .status(400)
        .send({ message: "No se pudo actualizar la publicación" });
    }
    if (!post) {
      return res.status(404).send({ message: "No se encontro la publicación" });
    }
    return res.status(200).send({ message: "Like realizado" });
  });
};

//quita dislike a un post
const dislikeMenosPost = (req, res) => {
  const { id } = req.params;
  Post.findByIdAndUpdate(id, { $inc: { dislikes: -1 } }, (err, post) => {
    if (err) {
      return res
        .status(400)
        .send({ message: "No se pudo actualizar la publicación" });
    }
    if (!post) {
      return res.status(404).send({ message: "No se encontro la publicación" });
    }
    return res.status(200).send({ message: "Like realizado" });
  });
};

// se realiza un comentario
const newComment = (req, res) => {
  const { id } = req.params;
  Post.findByIdAndUpdate(id, { $inc: { numComments: 1 } }, (err, post) => {
    if (err) {
      return res
        .status(400)
        .send({ message: "No se pudo actualizar la publicación" });
    }
    if (!post) {
      return res.status(404).send({ message: "No se encontro la publicación" });
    }
    return res
      .status(200)
      .send({ message: "Numero de comentarios actualizado" });
  });
};

// se realiza un comentario
const commentDeleted = (req, res) => {
  const { id } = req.params;
  Post.findByIdAndUpdate(id, { $inc: { numComments: -1 } }, (err, post) => {
    if (err) {
      return res
        .status(400)
        .send({ message: "No se pudo actualizar la publicación" });
    }
    if (!post) {
      return res.status(404).send({ message: "No se encontro la publicación" });
    }
    return res
      .status(200)
      .send({ message: "Numero de comentarios actualizado" });
  });
};

module.exports = {
  createPost,
  updatePost,
  reportPost,
  deletePost,
  getPost,
  getPosts,
  getReportedPosts,
  likePost,
  likeMenosPost,
  dislikePost,
  dislikeMenosPost,
  newComment,
  commentDeleted,
};
