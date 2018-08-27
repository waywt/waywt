require("dotenv").config();

const axios = require("axios");
const fs = require("fs");
const _ = require("lodash");

const baseUrl = "https://api.imgur.com/3/gallery/search/time/all/";
const opts = {
  headers: { Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}` }
};
const imageLinks = [];

(async () => {
  const waywt0 = await axios(`${baseUrl}0?q=waywt`, opts);
  const waywt1 = await axios(`${baseUrl}1?q=waywt`, opts);
  const waywt2 = await axios(`${baseUrl}2?q=waywt`, opts);
  const waywt3 = await axios(`${baseUrl}3?q=waywt`, opts);
  const waywt4 = await axios(`${baseUrl}4?q=waywt`, opts);
  const waywt5 = await axios(`${baseUrl}5?q=waywt`, opts);
  const waywt6 = await axios(`${baseUrl}6?q=waywt`, opts);
  const waywt7 = await axios(`${baseUrl}7?q=waywt`, opts);
  const waywt8 = await axios(`${baseUrl}8?q=waywt`, opts);
  const waywt9 = await axios(`${baseUrl}9?q=waywt`, opts);
  const waywt10 = await axios(`${baseUrl}10?q=waywt`, opts);

  const dataArray = [
    waywt0.data.data,
    waywt1.data.data,
    waywt2.data.data,
    waywt3.data.data,
    waywt4.data.data,
    waywt5.data.data,
    waywt6.data.data,
    waywt7.data.data,
    waywt8.data.data,
    waywt9.data.data,
    waywt10.data.data
  ];

  dataArray.forEach(galleries => {
    galleries.forEach((gallery, i) => {
      if (gallery.images) {
        gallery.images.forEach(image => {
          if (
            image.height > 360 &&
            image.height < 1000 &&
            image.link.slice(-4) !== ".mp4"
          ) {
            imageLinks.push(image.link);
          }
        });
      }
    });
  });

  fs.writeFileSync(
    "./server/utils/imageLinks.json",
    JSON.stringify(_.shuffle(imageLinks))
  );
})();