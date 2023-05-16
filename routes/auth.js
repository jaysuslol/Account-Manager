'use strict';

const express = require('express');
const router = express.Router();
const { login, signup, forgot } = require('../controllers/authController');

router.get('/', (req, res) => {
    res.status(403).send("<h1> what u doing here :eyes: </h1> <h4> 403: Access Forbidden </h4>");
});

router.post('/login', login);
router.post('/signup', signup);
router.post('/forgot', forgot);

module.exports = router;