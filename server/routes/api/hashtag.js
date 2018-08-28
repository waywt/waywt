const router = require('express').Router();

const HashtagsController = require('../../controllers/HashtagsController');

router.get('/:text', (req, res) => {
  HashtagsController.getHashtagOutfits(req, res);
});

module.exports = router;
