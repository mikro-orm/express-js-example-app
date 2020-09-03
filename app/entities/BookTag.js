'use strict';

const { Collection, EntitySchema } = require('@mikro-orm/core');
const { Book } = require('./Book');
const { BaseEntity } = require('./BaseEntity');

/**
 * @property {number} id
 * @property {string} name
 * @property {Collection<Book>} books
 */
class BookTag extends BaseEntity {

  /**
   * @param {string} name
   */
  constructor(name) {
    super();
    this.name = name;
  }

}

const schema = new EntitySchema({
  class: BookTag,
  extends: 'BaseEntity',
  properties: {
    name: { type: 'string' },
    books: {
      reference: 'm:n',
      owner: false,
      mappedBy: 'tags',
      type: 'Book',
    },
  },
});

module.exports.BookTag = BookTag;
module.exports.entity = BookTag;
module.exports.schema = schema;
