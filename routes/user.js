const express = require('express');
const router = express.Router();
const { User, Page } = require('../models');
const { userList, userPages } = require('../views');

//routes mounted on user
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(userList(users));
  } catch (error) {
    next(error);
  }
});

router.get('/:userId', async (req, res, next) => {
  try {
    console.log('inside get user/userid')
    const user = await User.findByPk(req.params.userId);
    const pages = await Page.findAll({
      where: {
        authorId: req.params.userId,
      },
    });
    res.send(userPages(user, pages));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
