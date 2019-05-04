const express = require('express');
const router = express.Router();
const { Page, User } = require('../models');
const { addPage, wikiPage } = require('../views');

//routes mounted on /wiki

router.get('/', (req, res) => {
  res.redirect('/');
});

router.get('/add', (req, res) => {
  res.send(addPage());
});

router.post('/', async (req, res, next) => {
  try {
    const page = await Page.create(req.body);
    res.redirect(`/wiki/${page.slug}`);
  } catch (err) {
    next(err);
  }
});

router.get('/:slug', async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug,
      },
    });
    res.send(wikiPage(page));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
