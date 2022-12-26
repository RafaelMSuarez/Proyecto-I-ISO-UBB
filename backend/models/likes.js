const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeSchema = new Schema({
  post: {
    type: Schema.ObjectId,
    ref: "post",
  },
  user: {
    type: Schema.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("like", likeSchema);
