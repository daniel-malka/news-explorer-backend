const ArticleSchema = require("../models/article.js");
const errorHandler = require("../errors/Error");
const getUserArticles = (req, res) => {
  const { _id } = req.body;

  return ArticleShema.statics
    .findUserByCredentials(_id)
    .then(() => res.send(articles));
};

const postArticle = (req, res) => {
  const { keyword, title, text, date, source, link, image, owner } = req.body;

  ArticleSchema.findOne({ keyword, source, link, text, owner }).then(
    (article) => {
      if (article) {
        next(new errorHandler(409, "this article is already posted"));
      }
      ArticleSchema.create({ title, text, date, source, link, image });
      res.send({ article });
    }
  );
};

const deleteArticle = (req, res) => {
  const { _id } = req.params;

  ArticleSchema.findById(_id).orFail(() => {
    if (!card.owner.equals(req.user._id)) {
      next(
        new ErrorHandler(
          403,
          `you must be the card owner  in order to delete it`
        )
      );
    }
    ArticleSchema.deleteOne(article).then(() => res.send(article));
  });
};

module.exports = { getUserArticles, postArticle, deleteArticle };
