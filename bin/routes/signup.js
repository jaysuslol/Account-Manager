const express = require('express');
const path = require('path');
const router = express.Router();

const dir = '../bin/routes';

router.get('/', (req, res) => {
    res.sendFile(path.resolve(`${dir}/signup.html`));
});

module.exports = router;