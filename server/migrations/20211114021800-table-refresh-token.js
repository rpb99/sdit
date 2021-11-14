"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("refresh_token", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      token: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      created_at: {
        field: "created_at",
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        field: "updated_at",
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("refresh_token");
  },
};
