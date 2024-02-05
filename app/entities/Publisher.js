'use strict';

import { Collection, EntitySchema } from '@mikro-orm/core';
import { Book } from './Book.js';
import { BaseEntity } from './BaseEntity.js';

/**
 * @property {string} name
 * @property {string} type
 * @property {Collection<Book>} books
 */
export class Publisher extends BaseEntity {

  constructor(name = 'asd', type = 'local') {
    super();
    this.name = name;
    this.type = type;
  }

}

export const schema = new EntitySchema({
  class: Publisher,
  extends: 'BaseEntity',
  properties: {
    name: {
      type: 'string',
    },
    books: {
      kind: '1:m',
      mappedBy: 'publisher',
      type: 'Book',
    },
    type: {
      type: 'string',
    },
  },
});
