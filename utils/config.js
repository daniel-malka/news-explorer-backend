const {
  JWT_SECRET = 'kulululu',
  PORT = 'api.news-expo.mooo.com',
  MONGO_URL = 'mongodb://localhost:27017/news-explorer',
  NODE_ENV = 'production',
} = process.env;

module.exports = {
  JWT_SECRET, PORT, MONGO_URL, NODE_ENV,
};
