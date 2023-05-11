const express = require('express');
const dbConn = require('../../app/server.js').dbConn;
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile('../routes/signup.html');
});

router.post('/signupcomplete', (req, res) => {
    let username = req.body.username;
    let pwd = req.body.pwd;
    let email = req.body.email;

    dbConn.then(conn => {
        conn.query(`INSERT INTO accounts(username, h_pass, email) VALUES("${username}", "${pwd}", "${email}")`);
        console.log("Account created");
    })
    
    res.sendFile('../routes/index.html');
});

module.exports = router;