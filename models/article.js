const { Schema, model } = require('mongoose');
const urlRegex = require('../utils/regex');

const ArticleSchema = new Schema(
  {
    title: { type: String, required: true },
    keyword: { type: String, required: true },
    text: { type: String, required: true },
    date: { type: String, required: true },
    source: { type: String, required: true },
    image: {
      type: String,
      required: true,
      validate: {
        validator: (value) => value.match(urlRegex),
        message: 'invalid url for the image soure',
      },
    },
    link: {
      type: String,
      required: true,
      validate: {
        validator: (value) => value.match(urlRegex),
        message: 'invalid url',
      },
    },
    owner: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  },
  {
    versionKey: false,
  }
);

module.exports = model('article', ArticleSchema);
