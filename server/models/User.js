const { Sequelize } = require("sequelize");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const db = require("../config/db");

const User = db.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
});

const encryptPassword = async (user) => {
  if (user.changed("password")) {
    user.password = await argon2.hash(user.password);
  }
};

User.beforeCreate(encryptPassword);
User.beforeUpdate(encryptPassword);

User.prototype.generateAccessToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

User.prototype.isMatch = async function (enteredPassword) {
  return await argon2.verify(this.password, enteredPassword);
};

module.exports = User;
