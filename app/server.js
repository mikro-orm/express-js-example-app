'use strict';

import express from 'express';
import { EntityManager, EntityRepository, MikroORM, RequestContext } from '@mikro-orm/core';
import { MongoHighlighter } from '@mikro-orm/mongo-highlighter';
import { AuthorController, BookController } from './controllers/index.js';
import { Author, Book } from './entities/index.js';

/**
 * @property {MikroORM} orm
 * @property {EntityManager} em
 * @property {EntityRepository<Author>} authorRepository
 * @property {EntityRepository<Book>} bookRepository
 */
export const DI = {};

export const app = express();
const port = process.env.PORT || 3000;

DI.orm = await MikroORM.init({
  highlighter: new MongoHighlighter(),
});
DI.em = DI.orm.em;
DI.authorRepository = DI.orm.em.getRepository(Author);
DI.bookRepository = DI.orm.em.getRepository(Book);

app.use(express.json());
app.use((req, res, next) => {
  RequestContext.create(DI.orm.em, next);
  req.di = DI;
});
app.get('/', (req, res) => res.json({ message: 'Welcome to MikroORM express JS example, try CRUD on /author and /book endpoints!' }));
app.use('/author', AuthorController);
app.use('/book', BookController);
app.use((req, res) => res.status(404).json({ message: 'No route found' }));

export const server = app.listen(port, () => {
  console.log(`MikroORM express JS example started at http://localhost:${port}`);
});
