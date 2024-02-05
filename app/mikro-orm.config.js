import { defineConfig } from '@mikro-orm/better-sqlite';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

export default defineConfig({
  dbName: 'mikro-orm-express-js',
  highlighter: new SqlHighlighter(),
});
