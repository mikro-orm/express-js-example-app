'use strict';

import { defineEntity, p } from '@mikro-orm/core';
import { BaseEntitySchema } from './BaseEntity.js';
import { Book } from './Book.js';

export const BookTagSchema = defineEntity({
  extends: BaseEntitySchema,
  name: 'BookTag',
  properties: {
    name: p.string(),
    books: () => p.manyToMany(Book).mappedBy('tags'),
  },
});

export class BookTag extends BookTagSchema.class {

  constructor(name) {
    super();
    this.name = name;
  }

}

BookTagSchema.setClass(BookTag);
