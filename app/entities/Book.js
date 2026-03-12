'use strict';

import { defineEntity, p } from '@mikro-orm/core';
import { BaseEntitySchema } from './BaseEntity.js';
import { Author } from './Author.js';
import { Publisher } from './Publisher.js';
import { BookTag } from './BookTag.js';

export const BookSchema = defineEntity({
  extends: BaseEntitySchema,
  name: 'Book',
  properties: {
    title: p.string(),
    author: () => p.manyToOne(Author),
    publisher: () => p.manyToOne(Publisher).nullable(),
    tags: () => p.manyToMany(BookTag).owner().inversedBy('books'),
  },
});

export class Book extends BookSchema.class {

  constructor(title, author) {
    super();
    this.title = title;
    this.author = author;
  }

}

BookSchema.setClass(Book);
