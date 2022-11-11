const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: "User",
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
});

module.exports = mongoose.model("comment", commentSchema);
