"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("siswa", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      nis: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      nama: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      tempat_lahir: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      tgl_lahir: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      jenis_kelamin: {
        type: Sequelize.ENUM,
        values: ["P", "L"],
        allowNull: false,
      },
      tingkat: Sequelize.STRING(12),
      telepon: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      alamat: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      foto: Sequelize.TEXT,
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    // await queryInterface.addConstraint("siswa", {
    //   type: "unique",
    //   name: "UNIQUE_USER_EMAIL",
    //   fields: ["nis"],
    // });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("siswa");
  },
};
