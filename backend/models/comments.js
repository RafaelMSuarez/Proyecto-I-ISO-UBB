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
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
}, {timestamps: true});

module.exports = mongoose.model("comment", commentSchema);
