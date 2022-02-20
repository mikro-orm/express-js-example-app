'use strict';

import { Collection, EntitySchema } from '@mikro-orm/core';
import { Publisher } from './Publisher.js';
import { Author } from './Author.js';
import { BookTag } from './BookTag.js';
import { BaseEntity } from './BaseEntity.js';

/**
 * @property {string} title
 * @property {Author} author
 * @property {Publisher} publisher
 * @property {Collection<BookTag>} tags
 */
export class Book extends BaseEntity {

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

export const schema = new EntitySchema({
  class: Book,
  extends: 'BaseEntity',
  properties: {
    title: { type: 'string' },
    author: {
      reference: 'm:1',
      type: 'Author',
    },
    publisher: {
      reference: 'm:1',
      type: 'Publisher',
      nullable: true,
    },
    tags: {
      reference: 'm:n',
      owner: true,
      inversedBy: 'books',
      type: 'BookTag',
    },
  },
});
