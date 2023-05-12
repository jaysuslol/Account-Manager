const express = require('express');
const path = require('path');
const router = express.Router();

const { error } = require('console');
const dir = '../bin/routes'

router.get('/', (req, res) => {
    res.sendFile(path.resolve(`${dir}/index.html`));
});

module.exports = router;