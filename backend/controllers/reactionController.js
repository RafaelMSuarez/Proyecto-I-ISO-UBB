const Post = require("../models/post.js");
const User = require("../models/user.js");
const Like = require("../models/likes");
const mongoose = require("mongoose");

const darLike = async (req, res) => {
  const { postId, userId } = req.body;

  Post.findById(postId).exec((err, post) => {
    if (!post) {
      return res.status(404).send({
        message: "Publicación no encontrada",
      });
    }
    if (err) {
      return res.status(400).send({ message: "Error al dar 'me gusta'" });
    }
    User.findById(userId, (err, user) => {
      if (!user) {
        return res.status(404).send({ message: "Usuario no encontrado" });
      }
      if (err) {
        return res.status(400).send({ err });
      }
      Like.findOne({ post: post._id, user: user._id }).exec((err, like) => {
        if (err) {
          return res.status(400).send({ message: "Error al dar 'me gusta'" });
        }
        if (like) {
          return res
            .status(400)
            .send({ message: "Ya has dado 'me gusta' a esta publicación" });
        }
        const newLike = new Like({ post: post._id, user: user._id });
        newLike.save(async (err, like) => {
          if (err) {
            return res
              .status(400)
              .send({ message: "No se ha podido dar un 'me gusta'" });
          } else {
            Post.findByIdAndUpdate(post._id, {
              $inc: { numLikes: 1 },
              $push: { likes: like },
            }).exec((err, post) => {
              return res.status(200).send(post);
            });
          }
        });
      });
    });
  });
};

const quitarLike = async (req, res) => {
  const { postId, userId } = req.body;

  Post.findById(postId).exec((err, post) => {
    if (err) {
      return res.status(400);
    }
    if (!post) {
      return res.status(404);
    }
    if (post) {
      Like.findOneAndRemove({ post: post._id, user: userId }).exec(
        (err, like) => {
          if (err) {
            return res.status(400);
          }
          if (!like) {
            return res.status(404);
          }
          if (like) {
            Post.findByIdAndUpdate(post._id, {
              $inc: { numLikes: -1 },
              $pull: { likes: mongoose.Types.ObjectId(like._id) },
            }).exec((err, post) => {
              if (err) {
                return res.status(400);
              }
              return res.status(200).send(post);
            });
          }
        }
      );
    }
  });
};

const verlikes = (req, res) => {
  Like.find({})
    .populate("user")
    .exec((err, likes) => {
      if (err) {
        return res.status(400).send({ message: "error" });
      }
      if (likes.length === 0) {
        return res.status(200).send([]);
      }
      return res.status(200).send(likes);
    });
};

const getLike = (req, res) => {
  const { postId, userRut } = req.params;

  User.findOne({ rut: userRut }).exec((err, user) => {
    if (err) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }
    if (!user) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }
    Like.findOne({ post: postId, user: user._id })
      .populate("user")
      .exec((err, like) => {
        if (err) {
          return res.status(400).send({ message: "Error al encontrar like" });
        }
        if (!like) {
          return res.status(200).send(false);
        }
        return res.status(200).send(true);
      });
  });
};

module.exports = {
  darLike,
  quitarLike,
  verlikes,
  getLike,
};
