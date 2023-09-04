'use strict';

const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/:code', (req, res) => {
    console.log(req.params.code);
    if (req.params.code == 200) {
        console.log('bongcloud');
        res.redirect('/login');
    }
});

module.exports = router;