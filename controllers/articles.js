const ArticleSchema = require('../models/article');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

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
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequestError(
            `${Object.values(err.errors)
              .map((error) => error.message)
              .join(', ')}`
          )
        );
      } else {
        next(err);
      }
    });
};

const deleteArticle = (req, res, next) => {
  const { articleId } = req.params;

  return ArticleSchema.findById(articleId)
    .orFail(() => {
      next(new NotFoundError('There is no such card'));
    })
    .then((article) => {
      if (!article.owner.equals(req.user._id)) {
        return next(
          new ForbiddenError(
            'You must be the article owner in order to delete it'
          )
        );
      }
      return ArticleSchema.deleteOne(article).then(() => res.send(article));
    })
    .catch((err) => next(err));
};

module.exports = { getUserArticles, postArticle, deleteArticle };
