const faker = require('faker');

const date = new Date();
const profiles = [];
let i = 1;

while (i <= 30) {
  const newProfile = {
    id: i,
    UserId: i,
    header: faker.lorem.words(),
    summary: faker.lorem.sentences(Math.floor(Math.random()*5)),
    avatar: faker.internet.avatar(),
    createdAt: date,
    updatedAt: date,
  };

  profiles.push(newProfile);
  i += 1;
}

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Profiles', profiles, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Profiles', null, {});
  },
};
