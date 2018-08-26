require('dotenv').config();

const axios = require('axios');
const fs = require('fs');
const _ = require('lodash');

const baseUrl = 'https://api.imgur.com/3/gallery/search/time/all/';
const opts = {
  headers: { 'Authorization': `Client-ID ${process.env.IMGUR_CLIENT_ID}` }
};
const imageLinks = [];
//'https://api.imgur.com/3/gallery/search/time/all/2?q=waywt'

(async() => {
  const waywt0 = await axios(`${baseUrl}0?q=waywt`, opts);
  const waywt1 = await axios(`${baseUrl}1?q=waywt`, opts);
  const waywt2 = await axios(`${baseUrl}2?q=waywt`, opts);
  const waywt3 = await axios(`${baseUrl}3?q=waywt`, opts);
  const waywt4 = await axios(`${baseUrl}4?q=waywt`, opts);
  const waywt5 = await axios(`${baseUrl}5?q=waywt`, opts);

  const fashion0 = await axios(`${baseUrl}0?q=fashion`, opts);
  const fashion1 = await axios(`${baseUrl}1?q=fashion`, opts);
  const fashion2 = await axios(`${baseUrl}2?q=fashion`, opts);
  const fashion3 = await axios(`${baseUrl}3?q=fashion`, opts);
  const fashion4 = await axios(`${baseUrl}4?q=fashion`, opts);
  const fashion5 = await axios(`${baseUrl}5?q=fashion`, opts);

  const clothing0 = await axios(`${baseUrl}0?q=clothing`, opts);
  const clothing1 = await axios(`${baseUrl}1?q=clothing`, opts);
  const clothing2 = await axios(`${baseUrl}2?q=clothing`, opts);
  const clothing3 = await axios(`${baseUrl}3?q=clothing`, opts);
  const clothing4 = await axios(`${baseUrl}4?q=clothing`, opts);
  const clothing5 = await axios(`${baseUrl}5?q=clothing`, opts);

  const dataArray = [
    waywt0.data.data,
    waywt1.data.data,
    waywt2.data.data,
    waywt3.data.data,
    waywt4.data.data,
    waywt5.data.data,
    fashion0.data.data,
    fashion1.data.data,
    fashion2.data.data,
    fashion3.data.data,
    fashion4.data.data,
    fashion5.data.data,
    clothing0.data.data,
    clothing1.data.data,
    clothing2.data.data,
    clothing3.data.data,
    clothing4.data.data,
    clothing5.data.data,
  ];
  
  dataArray.forEach(galleries => {
    galleries.forEach((gallery, i) => {
      if (gallery.images) {
        gallery.images.forEach(image => {
          if (image.height > 360 && image.height < 1000 && image.link.slice(-4) !== '.mp4') {
            imageLinks.push(image.link);
          }   
        });
      }
    });
  });
  
  fs.writeFileSync('./server/utils/imageLinks.json', JSON.stringify(_.shuffle(imageLinks)));
})();
