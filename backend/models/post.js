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
      maxLength: 1500,
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
  },
  { timestamps: true, expires: 60 }
);

module.exports = mongoose.model("post", postSchema);
