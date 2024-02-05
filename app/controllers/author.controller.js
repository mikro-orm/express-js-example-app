'use strict';

import { QueryOrder, wrap } from '@mikro-orm/core';
import { Router } from 'express';
import { DI } from '../server.js';
import { Author } from '../entities/Author.js';

const router = Router();

router.get('/', async (req, res) => {
  const authors = await DI.authors.findAll({
    populate: ['books'],
    orderBy: { name: QueryOrder.DESC },
    limit: 20,
  });
  res.json(authors);
});

router.get('/:id', async (req, res) => {
  try {
    const author = await DI.authors.findOne(+req.params.id, {
      populate: ['books'],
    });

    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }

    res.json(author);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});

router.post('/', async (req, res) => {
  if (!req.body.name || !req.body.email) {
    res.status(400);
    return res.json({ message: 'One of `name, email` is missing' });
  }

  try {
    const author = DI.em.create(Author, req.body);
    await DI.em.flush();

    res.json(author);
  } catch (e) {
    return res.status(400).json({ message: e.message, stack: e.stack });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const author = await DI.authors.findOneOrFail(+req.params.id);
    wrap(author).assign(req.body);
    await DI.em.flush();

    res.json(author);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});

export { router as AuthorController };
