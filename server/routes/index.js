const path = require("path");
const router = require("express").Router();
const auth = require("./auth/auth");
const user = require("./api/user");
const outfit = require("./api/outfit");
const hashtag = require("./api/hashtag");

// Auth Routes
router.use("/auth", auth);

// API routes
router.use("/api/users", user);
router.use("/api/outfits", outfit);
router.use("/api/hashtags", hashtag);

// send the react app if no routes above are hit
router.use((req, res) => {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = router;
