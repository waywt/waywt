const { Comment } = require('../models');

const createNewComment = (req, res) => {
  (async() => {
    const newComment = await Comment.create({
      text: req.body.text,
      UserId: req.user.id,
      OutfitId: req.params.id,
    });

    res.json(newComment);
  })();
}

module.exports = {
  createNewComment
};