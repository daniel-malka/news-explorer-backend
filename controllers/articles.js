const ArticleSchema = require('../models/article');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

const getSavedArticles = (req, res, next) => {
  const { _id } = req.user;

  ArticleSchema.find({ owner: _id })
    .then((articles) => res.send(articles))
    .catch((err) => next(err));
};

const saveArticle = (req, res, next) => {
  const { keyword, source, link, text, title, date, image } = req.body.Article;
  const { _id } = req.user;

  ArticleSchema.create({
    title,
    keyword,
    text,
    date,
    source,
    image,
    link,
    owner: _id,
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

const unsaveArticle = (req, res, next) => {
  const { articleId } = req.params;

  ArticleSchema.findById(articleId)
    .orFail(() => next(new NotFoundError('There is no such article')))
    .then((article) => {
      if (!article.owner.equals(req.user._id)) {
        throw new ForbiddenError(
          'You must be the article owner in order to delete it'
        );
      }

      return ArticleSchema.findByIdAndRemove(articleId);
    })
    .then((deletedArticle) => {
      res.send(deletedArticle);
    })
    .catch((err) => next(err));
};

module.exports = { getSavedArticles, saveArticle, unsaveArticle };
