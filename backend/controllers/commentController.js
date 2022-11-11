const Comment = require("../models/comments");

//crear un comentario
const createComment = (req, res) => {
  const { user, title, desc, likes, dislike } = req.body;
  const newComment = new Comment({
    user,
    desc,
    likes,
    dislike,
  });
  newComment.save((error, comment) => {
    if (error) {
      return res
        .status(400)
        .send({ message: "No se ha podido crear el comentario" });
    }
    return res.status(201).send(comment);
  });
};

//actualiza un comentario
const updateComment = (req, res) => {
  const { id } = req.params;
  Comment.findByIdAndUpdate(id, req.body, (error, comment) => {
    if (error) {
      return res
        .status(400)
        .send({ message: "No se pudo actualizar el comentario" });
    }
    if (!comment) {
      return res.status(404).send({ message: "No se encontro el comentario" });
    }
    return res.status(200).send({ message: "Comentario modificado" });
  });
};

//elimina un comentario
const deleteComment = (req, res) => {
  const { id } = req.params;
  Comment.findByIdAndDelete(id, (error, comment) => {
    if (error) {
      return res
        .status(400)
        .send({ message: "No se ha podido eliminar el comentario" });
    }
    if (!comment) {
      return res
        .status(404)
        .send({ message: "No se ha podido encontrar el comentario" });
    }
    return res
      .status(200)
      .send({ message: "Se ha eliminado el comentario de forma correcta" });
  });
};

// obtiene un comentario por id
const getComment = (req, res) => {
  const { id } = req.params;
  Comment.findById(id, (error, comment) => {
    if (error) {
      return res
        .status(400)
        .send({ message: "No se ha podido encontrar el comentario" });
    }
    if (!comment) {
      return res
        .status(404)
        .send({ message: "No se ha podido encontrar el comentario" });
    }
    return res.status(200).send(comment);
  });
};

//obtiene todos los comentarios
const getComments = (req, res) => {
  Comment.find({}, (error, comments) => {
    if (error) {
      return res
        .status(400)
        .send({ message: "No se pudo realizar la busqueda" });
    }
    if (comments.length === 0) {
      return res.status(404).send({ message: "No se encontraron comentarios" });
    }
    return res.status(200).send(comments);
  });
};

module.exports = {
  createComment,
  updateComment,
  deleteComment,
  getComment,
  getComments,
};
