const express = require('express');
const router = express.Router();
const { Page, User } = require('../models');
const { addPage, wikiPage, main, editPage } = require('../views');

//routes mounted on /wiki

router.get('/', async (req, res, next) => {
  try {
    const pages = await Page.findAll();
    res.send(main(pages));
  } catch (error) {
    next(error);
  }
});

router.get('/add', (req, res) => {
  res.send(addPage());
});

router.post('/', async (req, res, next) => {
  try {
    const [user, wasCreated] = await User.findOrCreate({
      where: {
        name: req.body.name,
        email: req.body.email,
      },
    });

    const page = await Page.create(req.body);

    //updates the page's authorId to be id of user
    //returns a promise for the updated page
    await page.setAuthor(user);

    res.redirect(`/wiki/${page.slug}`);
  } catch (err) {
    next(err);
  }
});

router.post("/:slug", async (req, res, next) => {
  try {
    const [updatedRowCount, updatedPages] = await Page.update(req.body, {
      where: {
        slug: req.params.slug
      },
      returning: true
    });

    res.redirect("/wiki/" + updatedPages[0].slug);
  } catch (error) { next(error) }
});

router.get('/:slug', async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug,
      },
    });
    if (page === null) {
      res.status(404).send('No page was found with this title');
    } else {
      const author = await page.getAuthor();
      res.send(wikiPage(page, author));
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:slug/edit", async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    });

    if (page === null) {
      res.sendStatus(404);
    } else {
      const author = await page.getAuthor();
      res.send(editPage(page, author));
    }
  } catch (error) { next(error) }
});

module.exports = router;
