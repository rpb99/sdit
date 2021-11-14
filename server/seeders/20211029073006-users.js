'use strict';
const { v4: uuidv4 } = require("uuid");
const argon2 = require('argon2')



module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password = await argon2.hash('123456')
    await queryInterface.bulkInsert('users', [{
      id: uuidv4(),
      id_siswa: 1,
      first_name: "Admin",
      last_name: "SDIT",
      email: 'admin@gmail.com',
      avatar: "avatar.png",
      role: "admin",
      password,
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
