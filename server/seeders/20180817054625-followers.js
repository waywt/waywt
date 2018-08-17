const date = new Date();
const followers = [];

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

let i = 1;
let idCounter = 1;

while (i <= 30) {
  const userIds = shuffleUserIds();
  const k = Math.floor(Math.random() * 13); // 0-12 followers per user
  let j = 0;

  while (j < k) { 
    if (userIds[j] !== i) { // do not allow user to follow him/herself
      const newFollower = {
        id: idCounter,
        UserId: i,
        FollowerId: userIds[j],
        createdAt: date,
        updatedAt: date,
      };
    
      followers.push(newFollower);
      idCounter += 1;
    }
    
    j += 1;
  }
  
  i += 1;
}

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Followers', followers, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Followers', null, {});
  },
};
