'use strict';

import { defineEntity, p } from '@mikro-orm/core';
import { BaseEntitySchema } from './BaseEntity.js';
import { Book } from './Book.js';

export const PublisherSchema = defineEntity({
  extends: BaseEntitySchema,
  name: 'Publisher',
  properties: {
    name: p.string(),
    type: p.string(),
    books: () => p.oneToMany(Book).mappedBy('publisher'),
  },
});

export class Publisher extends PublisherSchema.class {

  constructor(name = 'asd', type = 'local') {
    super();
    this.name = name;
    this.type = type;
  }

}

PublisherSchema.setClass(Publisher);
