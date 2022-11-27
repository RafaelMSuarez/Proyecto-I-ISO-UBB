const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: "user",
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
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
    reports: {
      type: Number,
      default: 0,
    },
    numComments: {
      type: Number,
      default: 0,
    },
    lifeTime: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("post", postSchema);
