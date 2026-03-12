import { defineConfig } from '@mikro-orm/sqlite';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { BaseEntitySchema } from './entities/BaseEntity.js';
import { AuthorSchema } from './entities/Author.js';
import { BookSchema } from './entities/Book.js';
import { BookTagSchema } from './entities/BookTag.js';
import { PublisherSchema } from './entities/Publisher.js';

export default defineConfig({
  dbName: 'mikro-orm-express-js',
  entities: [BaseEntitySchema, AuthorSchema, BookSchema, BookTagSchema, PublisherSchema],
  highlighter: new SqlHighlighter(),
  dynamicImportProvider: id => import(id),
});
