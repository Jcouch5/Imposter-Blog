const router = require('express').Router();
const user = require('./user.js');
const post = require('./post.js');

router.use('/user', user);
router.use('/post', post);

module.exports = router;
