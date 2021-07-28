"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("orang_tua", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      id_siswa: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "siswa",
          key: "id"

        },
      },
      nama_ayah: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      pekerjaan_ayah: Sequelize.STRING(100),
      penghasilan_ayah: Sequelize.DECIMAL,
      pendidikan_ayah: Sequelize.STRING(5),
      tempat_lahir_ayah: Sequelize.STRING(100),
      tgl_lahir_ayah: Sequelize.DATE,
      nama_ibu: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      pekerjaan_ibu: Sequelize.STRING(100),
      penghasilan_ibu: Sequelize.DECIMAL,
      pendidikan_ibu: Sequelize.STRING(5),
      tempat_lahir_ibu: Sequelize.STRING(100),
      tgl_lahir_ibu: Sequelize.DATE,
      alamat_ortu: Sequelize.TEXT,
      telepon: Sequelize.TEXT,

      surat_pindah: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      alamat: Sequelize.TEXT,
      tgl_masuk: Sequelize.DATE,
      tgl_keluar: Sequelize.DATE,
      tingkat: Sequelize.STRING(12),
      survei: Sequelize.STRING(100),
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
    await queryInterface.dropTable("orang_tua");
  },
};
