const faker = require('faker');
const bcrypt = require('bcryptjs');

const date = new Date();
const hashedPw = bcrypt.hashSync('password', 8);
const users = [];
let i = 1;

while (i <= 30) {
  const newUser = {
    id: i,
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: hashedPw,
    createdAt: date,
    updatedAt: date,
  };

  users.push(newUser);
  i += 1;
}

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Users', users, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
