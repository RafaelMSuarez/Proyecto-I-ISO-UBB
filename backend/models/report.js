const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportSchema = new Schema({
  post: {
    type: Schema.ObjectId,
    ref: "post",
  },
  user: {
    type: Schema.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("report", reportSchema);
