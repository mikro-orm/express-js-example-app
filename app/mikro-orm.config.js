import { defineConfig } from '@mikro-orm/sqlite';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

export default defineConfig({
  dbName: 'mikro-orm-express-js',
  highlighter: new SqlHighlighter(),
  dynamicImportProvider: id => import(id),
});
