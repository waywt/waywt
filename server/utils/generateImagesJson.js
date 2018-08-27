require("dotenv").config();

const axios = require("axios");
const fs = require("fs");
const _ = require("lodash");

const baseUrl = "https://api.imgur.com/3/gallery/r/";
const opts = {
  headers: { Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}` }
};
const imageLinks = [];

(async () => {
  const a = await axios(`${baseUrl}/findfashion`, opts);
  const b = await axios(`${baseUrl}/malefashion`, opts);
  const c = await axios(`${baseUrl}/OUTFITS`, opts);
  const d = await axios(`${baseUrl}/femalefashion`, opts);
  const e = await axios(`${baseUrl}/waywt`, opts);
  const f = await axios(`${baseUrl}/freeforallfashion`, opts);
  const g = await axios(`${baseUrl}/FemaleFashionAdvice`, opts);
  
  const dataArray = [
    a.data.data,
    b.data.data,
    c.data.data,
    d.data.data,
    e.data.data,
    f.data.data,
    g.data.data,
  ];

  dataArray.forEach(dataSet => {
    dataSet.forEach(item => {
      if (item.link && !item.nsfw && item.height > 400) {
        imageLinks.push(item.link);
      }
    });
  });

  console.log(imageLinks.length);

  fs.writeFileSync(
    "./server/utils/imageLinks.json",
    JSON.stringify(_.shuffle(imageLinks))
  );
})();