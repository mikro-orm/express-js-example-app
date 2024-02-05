'use strict';

import { QueryOrder, wrap } from '@mikro-orm/core';
import { Router } from 'express';
import { Book } from '../entities/index.js';
import { DI } from '../server.js';

const router = Router();

router.get('/', async (req, res) => {
  const books = await DI.books.findAll({
    populate: ['author'],
    orderBy: { title: QueryOrder.DESC },
    limit: 20,
  });
  res.json(books);
});

router.get('/:id', async (req, res) => {
  try {
    const book = await DI.books.findOneOrFail(+req.params.id, {
      populate: ['author'],
    });
    res.json(book);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});

router.post('/', async (req, res) => {
  if (!req.body.title || !req.body.author) {
    res.status(400);
    return res.json({ message: 'One of `title, author` is missing' });
  }

  try {
    const book = DI.em.create(Book, req.body);
    await DI.em.flush();

    res.json(book);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const book = await DI.books.findOneOrFail(+req.params.id);
    wrap(book).assign(req.body);
    await DI.em.flush();

    res.json(book);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});

export { router as BookController };
