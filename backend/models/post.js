const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const postSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 50,
  },
  desc: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 200,
  },
  likes: {
    type: Number,
    required: true,
  },
  dislikes: {
    type: Number,
    required: true,
  },
  reports: {
    type: Number,
    required: true,
  },
  numComments: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('post', postSchema);
