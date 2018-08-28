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
  const a = await axios(`${baseUrl}findfashion/time/all/0`, opts);
  const b = await axios(`${baseUrl}malefashion/time/all/0`, opts);
  const c = await axios(`${baseUrl}OUTFITS/time/all/0`, opts);
  const d = await axios(`${baseUrl}femalefashion/time/all/0`, opts);
  const e = await axios(`${baseUrl}waywt/time/all/0`, opts);
  const f = await axios(`${baseUrl}freeforallfashion/time/all/0`, opts);
  const g = await axios(`${baseUrl}FemaleFashionAdvice/time/all/0`, opts);
  const h = await axios(`${baseUrl}findfashion/time/all/1`, opts);
  const i = await axios(`${baseUrl}malefashion/time/all/1`, opts);
  const j = await axios(`${baseUrl}OUTFITS/time/all/1`, opts);
  const k = await axios(`${baseUrl}femalefashion/time/all/1`, opts);
  const l = await axios(`${baseUrl}waywt/time/all/1`, opts);
  const m = await axios(`${baseUrl}freeforallfashion/time/all/1`, opts);
  const n = await axios(`${baseUrl}FemaleFashionAdvice/time/all/1`, opts);
  const o = await axios(`${baseUrl}findfashion/time/all/1`, opts);
  const p = await axios(`${baseUrl}malefashion/time/all/1`, opts);
  const q = await axios(`${baseUrl}OUTFITS/time/all/1`, opts);
  const r = await axios(`${baseUrl}femalefashion/time/all/1`, opts);
  const s = await axios(`${baseUrl}waywt/time/all/1`, opts);
  const t = await axios(`${baseUrl}freeforallfashion/time/all/1`, opts);
  const u = await axios(`${baseUrl}FemaleFashionAdvice/time/all/1`, opts);
  
  const dataArray = [
    a.data.data,
    b.data.data,
    c.data.data,
    d.data.data,
    e.data.data,
    f.data.data,
    g.data.data,
    h.data.data,
    i.data.data,
    j.data.data,
    k.data.data,
    l.data.data,
    m.data.data,
    n.data.data,
    o.data.data,
    p.data.data,
    q.data.data,
    r.data.data,
    s.data.data,
    t.data.data,
    u.data.data,
  ];

  dataArray.forEach(dataSet => {
    dataSet.forEach(item => {
      if (item.link && !item.nsfw && item.height > 400 && item.height < 1600) {
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