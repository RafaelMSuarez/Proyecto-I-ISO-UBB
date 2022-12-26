const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const cookieParser = require("cookie-parser");
dotenv.config();

const commentRoutes = require("./routes/commentRoutes.js");
const postRoutes = require("./routes/postRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
// const fileRoutes = require("./routes/fileRoutes.js");
const mailerRouters = require("./routes/mailerRouters");
const reactionController = require("./routes/reactionsRoutes");

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.options("*", cors());
app.use(cookieParser());

app.use("/api", commentRoutes);
app.use("/api", postRoutes);
app.use("/api", userRoutes);
// app.use("/api", fileRoutes);
app.use("/api", mailerRouters);
app.use("/api", reactionController);

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
