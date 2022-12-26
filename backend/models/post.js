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
      type: [Schema.ObjectId],
      ref: "like",
    },
    dislikes: {
      type: [Schema.ObjectId],
      ref: "dislike",
    },
    reports: {
      type: [Schema.ObjectId],
      ref: "report",
    },
    numReports: {
      type: Number,
      default: 0,
    },
    numLikes: {
      type: Number,
      default: 0,
    },
    numDislikes: {
      type: Number,
      default: 0,
    },
    numComments: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("post", postSchema);
