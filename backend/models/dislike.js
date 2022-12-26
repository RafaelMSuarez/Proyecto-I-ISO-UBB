const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dislikeSchema = new Schema({
  post: {
    type: Schema.ObjectId,
    ref: "post",
  },
  user: {
    type: Schema.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("dislike", dislikeSchema);
