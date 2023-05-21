const ArticleSchema = require('../models/article');
const ErrorHandler = require('../errors/Error');

const getUserArticles = (req, res, next) => {
  const { _id } = req.user;

  ArticleSchema.find({ owner: _id })
    .then((articles) => res.send(articles))
    .catch((err) => next(err));
};

const postArticle = (req, res, next) => {
  const { keyword, source, link, text, title, date, image } = req.body;

  ArticleSchema.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => res.send(article))
    .catch((err) => next(err));
};

const deleteArticle = (req, res, next) => {
  const { articleId } = req.params;

  return ArticleSchema.findById(articleId)
    .orFail(() => {
      next(new ErrorHandler(409, 'there is no such card'));
    })
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        return next(
          new ErrorHandler(
            403,
            'you must be the card owner in order to delete it'
          )
        );
      }
      ArticleSchema.deleteOne(card).then(() => res.send(card));
    })
    .catch((err) => next(err));
};

module.exports = { getUserArticles, postArticle, deleteArticle };
