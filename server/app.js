require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { readdirSync } = require("fs");
const cors = require("cors");

const db = require("./config/db");

// Models Require
const User = require("./models/User");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

db
  // .sync({ force: true })
  .sync();
// .then((result) => User.findByPk(1))
// .then((user) => {
//   if (!user)
//     User.create({
//       username: "rpb",
//       email: "tes@mail.com",
//       password: "test123",
//     });
//   return user;
// });

module.exports = app;
