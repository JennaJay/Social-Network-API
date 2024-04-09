const router = require('express');
const apiRoutes = require('./routes/api');

router.use('/api', apiRoutes);

module.exports = router;