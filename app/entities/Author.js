'use strict';

import { defineEntity, p } from '@mikro-orm/core';
import { BaseEntitySchema } from './BaseEntity.js';
import { Book } from './Book.js';

export const AuthorSchema = defineEntity({
  extends: BaseEntitySchema,
  name: 'Author',
  properties: {
    name: p.string(),
    email: p.string(),
    age: p.integer().nullable(),
    termsAccepted: p.boolean(),
    identities: p.array().nullable(),
    born: p.datetime().nullable(),
    books: () => p.oneToMany(Book).mappedBy('author'),
    favouriteBook: () => p.manyToOne(Book).nullable(),
  },
});

export class Author extends AuthorSchema.class {

  constructor(name, email) {
    super();
    this.name = name;
    this.email = email;
    this.termsAccepted = false;
  }

}

AuthorSchema.setClass(Author);
