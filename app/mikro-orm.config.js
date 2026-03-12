import { defineConfig } from '@mikro-orm/sqlite';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { schema as BaseEntitySchema } from './entities/BaseEntity.js';
import { schema as AuthorSchema } from './entities/Author.js';
import { schema as BookSchema } from './entities/Book.js';
import { schema as BookTagSchema } from './entities/BookTag.js';
import { schema as PublisherSchema } from './entities/Publisher.js';

export default defineConfig({
  dbName: 'mikro-orm-express-js',
  entities: [BaseEntitySchema, AuthorSchema, BookSchema, BookTagSchema, PublisherSchema],
  highlighter: new SqlHighlighter(),
  dynamicImportProvider: id => import(id),
});
