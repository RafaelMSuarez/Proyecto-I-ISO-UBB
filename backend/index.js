const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

const commentRoutes = require("./routes/commentRoutes.js");
const postRoutes = require("./routes/postRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
// const fileRoutes = require("./routes/fileRoutes.js");
const mailerRouters = require('./routes/mailerRouters');

app.use(cors());
app.use(express.json());
app.options("*", cors());

app.use("/api", commentRoutes);
app.use("/api", postRoutes);
app.use("/api", userRoutes);
// app.use("/api", fileRoutes);
app.use("/api", mailerRouters);

const options = {
  useNewUrlParser: true,
  autoIndex: true,
  keepAlive: true,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  family: 4,
  useUnifiedTopology: true,
};

mongoose.connect(process.env.DB, options, (error) => {
  if (error) {
    console.log(error);
  } else {
    app.listen(process.env.PORT, () => {
      console.log(`Server started on port ${process.env.PORT}`);
    });
    console.log("Connected to database");
  }
});
