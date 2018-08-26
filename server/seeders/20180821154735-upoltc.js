const faker = require('faker');
const bcrypt = require('bcryptjs');
const fs = require('fs');

const images = JSON.parse(fs.readFileSync('./server/utils/imageLinks.json'));
const date = new Date();
const hashedPw = bcrypt.hashSync('password', 8);
const users = [];
const profiles = [];
const outfits = [];
const likes = [];
const tags = [];
const comments = [];

let i = 1; // id counter for user, profile
let outfitIdCounter = 1; // id counter for outfit
let likeIdCounter = 1;
let tagIdCounter = 1;
let commentIdCounter = 1;

const shuffleUserIds = () => {
  const array = Array.from({length: 30}, (v, i) => i + 1);
  let temp;
  let randIdx;

  array.forEach((el, i) => {
    randIdx = Math.floor(Math.random() * array.length);
    temp = array[i];
    array[i] = array[randIdx];
    array[randIdx] = temp;
  });

  return array;
};

while (i <= 30) {
  const pastDate = faker.date.past(); // user creation date
  const numOutfits = Math.floor(Math.random() * 21) // 0..20 outfits per user
  let j = 0;

  const newUser = {
    id: i,
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: hashedPw,
    createdAt: pastDate,
    updatedAt: date,
  };

  const newProfile = {
    id: i,
    UserId: i,
    header: faker.lorem.words(),
    summary: faker.lorem.sentences(Math.floor(Math.random()*5)),
    avatar: faker.internet.avatar(),
    createdAt: pastDate,
    updatedAt: date,
  };

  while (j < numOutfits) {
    const newOutfit = {
      id: outfitIdCounter,
      description: faker.lorem.sentences(Math.floor(Math.random() * 3) + 1),
      imageUrl: images[outfitIdCounter],
      UserId: i,
      CategoryId: Math.floor(Math.random() * 6) + 1,
      createdAt: faker.date.between(pastDate, date),
      updatedAt: date,
    };
  
    outfits.push(newOutfit);
    outfitIdCounter += 1;
    j += 1;
  }

  profiles.push(newProfile);
  users.push(newUser);
  i += 1;
}

outfits.forEach((outfit) => {
  const userIds = shuffleUserIds(); // shuffled userIds
  const numLikes = Math.floor(Math.random() * 31) // 0..30 likes per outfit
  const numTags = Math.floor(Math.random() * 6) // 0..5 tags per outfit
  const numComments = Math.floor(Math.random() * 11) // 0..10 comments per outfit

  let l = 0;
  let t = 0;
  let c = 0;

  while (l < numLikes) { // note: likes should not have repeat UserId's
    const newLike = {
      id: likeIdCounter,
      UserId: userIds[l],
      OutfitId: outfit.id,
      createdAt: date,
      updatedAt: date,
    };

    likes.push(newLike);
    likeIdCounter += 1;
    l += 1;
  }

  while (t < numTags) {
    const newTag = {
      id: tagIdCounter,
      text: faker.lorem.words(Math.floor(Math.random()*4) + 1),
      x: faker.random.number(1000000)/10000,
      y: faker.random.number(1000000)/10000,
      UserId: outfit.UserId,
      TaggedId: Math.random() > 0.7 ? Math.floor(Math.random() * 30) + 1 : null,
      OutfitId: outfit.id,
      createdAt: faker.date.between(outfit.createdAt, date),
      updatedAt: date
    }

    tags.push(newTag);
    tagIdCounter += 1;
    t += 1;
  }

  while (c < numComments) {
    const newComment = {
      id: commentIdCounter,
      text: faker.lorem.sentences(Math.floor(Math.random() * 4) + 1),
      UserId: Math.floor(Math.random() * 30) + 1,
      OutfitId: outfit.id,
      createdAt: faker.date.between(outfit.createdAt, date),
      updatedAt: date,
    };

    comments.push(newComment);
    commentIdCounter += 1;
    c += 1;
  }
});


module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Users', users, {});
    await queryInterface.bulkInsert('Profiles', profiles, {});
    await queryInterface.bulkInsert('Outfits', outfits, {});
    await queryInterface.bulkInsert('Likes', likes, {});
    await queryInterface.bulkInsert('Tags', tags, {});
    await queryInterface.bulkInsert('Comments', comments, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Comments', {}, {});
    await queryInterface.bulkDelete('Tags', {}, {});
    await queryInterface.bulkDelete('Likes', {}, {});
    await queryInterface.bulkDelete('Outfits', {}, {});
    await queryInterface.bulkDelete('Profiles', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  },
};
