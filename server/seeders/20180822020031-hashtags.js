const adjectives = ['red', 'blue', 'white', 'black', 'gray', 'yellow', 'orange', 'purple', 'green', 'brown', 'pink', 'astounding', 'mindblowing', 'electrifying', 'impressive', 'stunning', 'shocking', 'phenomenal', 'remarkable', 'aweinspiring', 'thrilling', 'chic', 'current', 'elegant', 'sharp', 'smart', 'sophisticated', 'refined', 'studied', 'urbane', 'classic', 'quintessential', 'archetypal', 'distinguished', 'excellent', 'ideal', 'classy', 'posh', 'prim', 'ritzy', 'trim', 'turnedout', 'glossy', 'tasteful', 'cool', 'fresh', 'refreshing', 'snappy', 'clever', 'keen', 'cute', 'charming', 'delightful', 'pretty', 'sweet', 'darling', 'fetching', 'precious', 'easy', 'natural', 'accessible', 'effortless', 'leisurely', 'excited', 'ebullient', 'elated', 'firedup', 'jubilant', 'overjoyed', 'pleased', 'tickled', 'flushed', 'reveling', 'exciting', 'fascinating', 'intriguing', 'spellbinding', 'riveting', 'enchanting', 'compelling', 'irresistible', 'magnetic', 'fabulous', 'breathtaking', 'outrageous', 'marvelous', 'spectacular', 'striking', 'superb', 'fancy', 'frilly', 'froufrou', 'sumptuous', 'showy', 'ornate', 'embellished', 'deluxe', 'lavish', 'rich', 'simple', 'light', 'clean', 'straightforward', 'uncomplicated', 'stark', 'stylish', 'dashing', 'dressedtokill', 'jazzy', 'jaunty', 'alamode', 'vintage', 'retro', 'dated', 'nostalgic', 'evocative', 'wonderful', 'admirable', 'astonishing', 'brilliant', 'remarkable', 'miraculous', 'sensational', 'swell', 'ambrosial', 'fashionable', 'aucourant', 'exclusive', 'fresh', 'hip', 'modish', 'supercool', 'swish', 'trendy', 'voguish', 'downtown', 'edgy', 'funky', 'dapper', 'dressy', 'kicky', 'natty', 'rakish', 'sassy', 'saucy', 'spiffy', 'spruce', 'chichi', 'flossy', 'haute', 'nobby', 'swank', 'graceful', 'handsome', 'majestic', 'sophisticated', 'stately', 'understated', 'flashy', 'gallant', 'dandyish', 'dudish', 'ultrachic', 'ultracool', 'ultrahip', 'ultraposh', 'ultrasmart', 'ultrasophisticated', 'cheesy', 'tacky', 'unattractive', 'unbecoming', 'graceless', 'inelegant', 'tastless', 'trashy', 'unhandsome', 'frowsy', 'sloppy', 'slovenly', 'unkempt', 'untidy', 'disheveled', 'messy', 'mussy', 'rumpled', 'wrinkled', 'shabby', 'sleazy', 'dowdy', 'out', 'outmoded', 'styles', 'unchic', 'uncool', 'unfashionable', 'unmodish', 'unstylish'];
const nouns = ['fashion', 'fad', 'flair', 'form', 'look', 'mode', 'model', 'pattern', 'shape', 'taste', 'thing', 'tone', 'trend', 'appearance', 'bandwagon', 'configuration', 'convention', 'craze', 'cry', 'cultism', 'cultus', 'custom', 'cut', 'figure', 'furor', 'latest', 'line', 'make', 'mold', 'rage', 'usage', 'vogue', 'adventurer', 'commuter', 'hiker', 'migrant', 'passenger', 'pilgrim', 'sailor', 'tourist', 'barnstormer', 'bum', 'drifter', 'excursionist', 'explorer', 'floater', 'gadabout', 'globetrotter', 'gypsy', 'haj', 'hobo', 'itinerant', 'journeyer', 'navigator', 'nomad', 'peddler', 'rambler', 'roamer', 'rover', 'sefarer', 'sightseer', 'tramp', 'trekker', 'tripper', 'trouper', 'truant', 'vagabond', 'vagrant', 'voyager', 'wanderer', 'wayfarer', 'actor', 'banana', 'buffoon', 'card', 'clown', 'comedian', 'comic', 'devil', 'fool', 'gagster', 'humorist', 'jester', 'jokester', 'prankster', 'punster', 'stooge', 'trickster', 'wag', 'wit', 'baron', 'businessman', 'businesswoman', 'capitalist', 'dealer', 'employer', 'entrepreneur', 'executive', 'financier', 'industrialist', 'manager', 'merchandiser', 'merchant', 'operator', 'storekeeper', 'suit', 'trafficker', 'tycoon', 'homie', 'brother', 'buddy', 'neighbor', 'bro', 'acquaintance', 'friend', 'bystander', 'homebody', 'aristocrat', 'archduchess', 'archduke', 'count', 'countess', 'duchess', 'duke', 'emperor', 'empress', 'gentleman', 'gentlewoman', 'lady', 'lord', 'prince', 'princess', 'royalty', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

const date = new Date();
const hashtags = [];
const hashtagsText = [];
let h = 0;

while (h < 500) {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = Math.random() > 0.3 ? nouns[Math.floor(Math.random() * nouns.length)] : '';
  hashtagsText.push(`${adj}${noun}`);
  h += 1;
}

const uniqueHashtagsText = [...new Set(hashtagsText)];

uniqueHashtagsText.forEach((text, index) => {
  const newHashtag = {
    id: index + 1,
    text: text,
    createdAt: date,
    updatedAt: date
  };
  hashtags.push(newHashtag);
});

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Hashtags', hashtags, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Hashtags', {}, {});
  },
};

