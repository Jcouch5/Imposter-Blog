const router = require('express').Router();
const { route } = require('express/lib/application');
const { Posts, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const PostsData = await Posts.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const Posts = PostsData.map((Posts) => Posts.get({ plain: true }));

    res.render('homepage', {
      Posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/Posts/:id', async (req, res) => {
  try {
    const PostsData = await Posts.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const Posts = PostsData.get({ plain: true });

    res.render('Posts', {
      ...Posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Posts }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

router.get('/newpost', (req, res) => {
  res.render('newpost');
});
module.exports = router;
