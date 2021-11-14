const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { JWT_EXPIRE_IN, JWT_SECRET } = process.env;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      id_siswa: DataTypes.UUID,
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      avatar: DataTypes.STRING,
      role: {
        type: DataTypes.ENUM,
        values: ["admin", "student"],
        allowNull: false,
        defaultValue: "student",
      },
      createdAt: {
        field: "created_at",
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        field: "updated_at",
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "users",
      timestamps: true,
    }
  );

  const encryptPassword = async (user) => {
    user.id = uuidv4();

    if (user.changed("password")) {
      user.password = await argon2.hash(user.password);
    }
  };

  User.beforeCreate(encryptPassword);
  User.beforeUpdate(encryptPassword);

  User.prototype.generateAccessToken = function () {
    return jwt.sign({ id: this.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRE_IN,
    });
  };

  User.prototype.isMatch = async function (enteredPassword) {
    return await argon2.verify(this.password, enteredPassword);
  };

  User.associate = (models) => {
    User.belongsTo(models.RefreshToken, { foreignKey: "user_id" });
  };

  return User;
};
