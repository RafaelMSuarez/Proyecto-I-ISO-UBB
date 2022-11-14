const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: "user",
  },
  post: {
    type: Schema.ObjectId,
    ref: "post"
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
}, {timestamps: true});

module.exports = mongoose.model("comment", commentSchema);
