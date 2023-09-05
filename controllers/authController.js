'use strict';

//var mail = require('../utils/nodemailer');
const bcrypt = require('bcrypt');
const dbConn = require('../utils/database/DatabaseConnection');

const saltRounds = 10;


// SIGNUP FUNCTION
exports.signup = async (req, res, next) => {
    const { username, pwd, confirmpwd, email } = req.body;

    if (pwd.length < 6) {
        return res.status(400).send("Password cannot be shorter than 6 characters")
    }

    if (pwd != confirmpwd) {
        return res.status(400).send("Passwords do not match")
    }
    
    if (username.length < 6) {
        return res.status(400).send("Username cannot be shorter than 6 characters")
    }
    
    // Hash password
    const hashed_p = await hash_p(pwd, saltRounds);

    // Insert user info to database
    const query = `INSERT INTO accounts(username, h_pass, email) VALUES("${username}", "${hashed_p}", "${email}")`;
    const result = await dbConn.executeQuery(query);

    if (result) {
        return res.status(200).send("Account created successfully");
    }
}


// LOGIN FUNCTION
exports.login = async (req, res, next) => {
    const { username, pwd } = req.body;
    let hashed_pass;

    if (!username || !pwd) {
      res.status(400).send("Username or password are empty");
    }

    const query = `SELECT h_pass FROM accounts WHERE username = "${username}"`;
    const result = await dbConn.executeQuery(query);

    if (result) {
        if (result[0] == null) {
            res.status(401).send("User not found");
        }

        hashed_pass = result[0].h_pass;

        const compPass = await bcrypt.compare(pwd, hashed_pass);
        if (compPass) {
            res.redirect("/redirect/200"); // 200 = OK
        } else {
            res.status(401).send("Password is invalid");
        }
    }

    return next();
}


// RESET PASSWORD FUNCTION
exports.forgot = async (req, res, next) => {
    const { email } = req.body;

    //mail(email).send();
}

async function hash_p(pwd, rounds) {
    const salt = await bcrypt.genSalt(rounds);
    const h_pwd = await bcrypt.hash(pwd, salt);

    return h_pwd;
}