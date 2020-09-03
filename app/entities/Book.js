'use strict';

const { Publisher } = require('./Publisher');
const { Author } = require('./Author');
const { BookTag } = require('./BookTag');
const { BaseEntity } = require('./BaseEntity');
const { Collection, EntitySchema } = require('@mikro-orm/core');

/**
 * @property {string} title
 * @property {Author} author
 * @property {Publisher} publisher
 * @property {Collection<BookTag>} tags
 */
class Book extends BaseEntity {

  /**
   * @param {string} title
   * @param {Author} author
   */
  constructor(title, author) {
    super();
    this.title = title;
    this.author = author;
  }

}

const schema = new EntitySchema({
  class: Book,
  extends: 'BaseEntity',
  properties: {
    title: { type: 'string' },
    author: {
      reference: 'm:1',
      type: 'Author',
      fk: 'id',
    },
    publisher: {
      reference: 'm:1',
      type: 'Publisher',
      fk: 'id',
    },
    tags: {
      reference: 'm:n',
      owner: true,
      inversedBy: 'books',
      type: 'BookTag',
    },
  },
});

module.exports.Book = Book;
module.exports.entity = Book;
module.exports.schema = schema;
