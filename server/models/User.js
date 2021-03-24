const { Sequelize } = require("sequelize");
const argon2 = require("argon2");

const db = require("../config/db");

const User = db.define(
  "user",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    username: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
  },
  {
    hooks: {
      beforeCreate: async (user, options) => {
        {
          user.password =
            user.password && user.password != ""
              ? await argon2.hash(user.password)
              : "";
        }
      },
    },
  }
);

module.exports = User;
