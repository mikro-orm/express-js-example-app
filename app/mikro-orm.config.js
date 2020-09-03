const { MongoHighlighter } = require('@mikro-orm/mongo-highlighter');
const { Author, Book, BookTag, Publisher, BaseEntity } = require('./entities');

module.exports = {
  type: 'mongo',
  entities: [Author, Book, Publisher, BookTag, BaseEntity],
  dbName: 'mikro-orm-express-js',
  highlighter: new MongoHighlighter(),
  debug: true,
};
