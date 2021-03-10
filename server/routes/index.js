const express = require('express');
const router = express.Router();
const chirpsRouter = require('./chirps');


// route is already matched to /api
router.use("/chirps", chirpsRouter);

module.exports = router;