'use strict';

import { Collection, EntitySchema } from '@mikro-orm/core';
import { Book } from './Book.js';
import { BaseEntity } from './BaseEntity.js';

/**
 * @property {number} id
 * @property {string} name
 * @property {Collection<Book>} books
 */
export class BookTag extends BaseEntity {

  /**
   * @param {string} name
   */
  constructor(name) {
    super();
    this.name = name;
  }

}

export const schema = new EntitySchema({
  class: BookTag,
  extends: 'BaseEntity',
  properties: {
    name: { type: 'string' },
    books: {
      kind: 'm:n',
      owner: false,
      mappedBy: 'tags',
      type: 'Book',
    },
  },
});
