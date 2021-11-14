'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('siswa', [{
      id: 1,
      nis: '12345',
      nama: "Andi",
      tempat_lahir: "Tembilahan",
      tgl_lahir: new Date("02/08/2013"),
      jenis_kelamin: 'L',
      tingkat: '12',
      telepon: '089523432722',
      alamat: 'Jl.Ahmad Yani',
      foto: "avatar.png",
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('siswa', null, {});
  }
};
