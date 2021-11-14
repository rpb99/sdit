"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("sekolah_asal", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      id_siswa: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "siswa",
          key: "id",
        },
      },
      nama: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      surat_pindah: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      alamat: Sequelize.TEXT,
      tgl_keluar: Sequelize.DATE,
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("sekolah_asal");
  },
};
