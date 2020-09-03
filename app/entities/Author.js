'use strict';

const { Collection, EntitySchema } = require('@mikro-orm/core');
const { Book } = require('./Book');
const { BaseEntity } = require('./BaseEntity');

/**
 * @property {string} name
 * @property {string} email
 * @property {number} age
 * @property {boolean} termsAccepted
 * @property {string[]} identities
 * @property {Date} born
 * @property {Collection<Book>} books
 * @property {Book} favouriteBook
 * @property {number} version
 * @property {string} versionAsString
 */
class Author extends BaseEntity {

  /**
   * @param {string} name
   * @param {string} email
   */
  constructor(name, email) {
    super();
    this.name = name;
    this.email = email;
    this.termsAccepted = false;
  }

}

Author.beforeDestroyCalled = 0;
Author.afterDestroyCalled = 0;

const schema = new EntitySchema({
  class: Author,
  extends: 'BaseEntity',
  properties: {
    name: { type: 'string' },
    email: { type: 'string' },
    age: { type: 'number' },
    termsAccepted: { type: 'boolean' },
    identities: { type: 'string[]' },
    born: { type: 'Date' },
    books: {
      reference: '1:m',
      mappedBy: 'author',
      type: 'Book',
    },
    favouriteBook: {
      reference: 'm:1',
      type: 'Book',
    },
  },
});

module.exports.Author = Author;
module.exports.entity = Author;
module.exports.schema = schema;
