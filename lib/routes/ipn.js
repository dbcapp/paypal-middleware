'use strict';
const express = require('express');
const handler = require('../handlers').ipn;
const router = express.Router();

router.post('/ipn-callback', handler.callback);

module.exports = router;
