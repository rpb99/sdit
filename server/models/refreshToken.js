const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  const RefreshToken = sequelize.define(
    "RefreshToken",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
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
      tableName: "refresh_token",
      timestamps: true,
    }
  );

  RefreshToken.beforeCreate((item) => (item.id = uuidv4()));

  RefreshToken.associate = (models) => {
    RefreshToken.belongsTo(models.User, { foreignKey: "user_id" });
  };

  return RefreshToken;
};
