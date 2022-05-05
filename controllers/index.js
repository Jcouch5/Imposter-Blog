const router = require('express').Router();

const apiRoutes = require('./api-routes');
const homeRoutes = require('./home.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
