'use strict';

import { Collection, EntitySchema } from '@mikro-orm/core';
import { Book } from './Book.js';
import { BaseEntity } from './BaseEntity.js';

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
export class Author extends BaseEntity {

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

export const schema = new EntitySchema({
  class: Author,
  extends: 'BaseEntity',
  properties: {
    name: { type: 'string' },
    email: { type: 'string' },
    age: { type: 'number', nullable: true },
    termsAccepted: { type: 'boolean' },
    identities: { type: 'string[]', nullable: true },
    born: { type: 'Date', nullable: true },
    books: {
      kind: '1:m',
      mappedBy: 'author',
      type: 'Book',
    },
    favouriteBook: {
      kind: 'm:1',
      type: 'Book',
      nullable: true,
    },
  },
});
