'use strict';

const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.resolve(path.join(__dirname, './forgot.html')));
});

module.exports = router;