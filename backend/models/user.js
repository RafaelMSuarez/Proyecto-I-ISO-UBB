const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 100,
  },
  rol: {
    type: String,
    required: true,
    enum: ["Vecino", "Admin"],
  },
  rut: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 20,
  },
  numcasa: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 100,
  },
  desc: {
    type: String,
    required: false,
    minLength: 1,
    maxLength: 100,
  },
  numpost: {
    type: Number,
    required: true,
  },
}, {timestamps: true});

module.exports = mongoose.model("user", userSchema);
