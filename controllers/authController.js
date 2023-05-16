'use strict';

const bcrypt = require('bcrypt');
const dbConn = require('../utils/database/DatabaseConnection');

const saltRounds = 10;


// SIGNUP FUNCTION
exports.signup = async (req, res, next) => {
    const { username, pwd, confirmpwd, email } = req.body;

    if (pwd.length < 6) {
        return res.status(400).json({ message: "Password cannot be shorter than 6 characters" })
    }

    if (pwd != confirmpwd) {
        return res.status(400).json({ message: "Passwords do not match" })
    }
    
    if (username.length < 6) {
        return res.status(400).json({ message: "Username cannot be shorter than 6 characters" })
    }
    
    // Hash password
    const hashed_p = await hash_p(pwd, saltRounds);

    // Insert user info to database
    const query = `INSERT INTO accounts(username, h_pass, email) VALUES("${username}", "${hashed_p}", "${email}")`;
    const result = await dbConn.executeQuery(query);

    if (result) {
        return res.status(200).json({ message: "Account created successfully" });
    }
}


// LOGIN FUNCTION
exports.login = async (req, res, next) => {
    const { username, pwd } = req.body;
    let h_pass;

    if (!username || !pwd) {
      return res.status(400).json({ message: "Username or password are empty" })
    }

    const query = `SELECT h_pass FROM accounts WHERE username = "${username}"`;
    const result = await dbConn.executeQuery(query);

    if (result) {
        h_pass = result[0].h_pass;

        const compPass = await bcrypt.compare(pwd, h_pass);
        if (compPass) {
            return res.status(200).json({ message: "Login successful" });
        } else {
            return res.status(401).json({ message: "Password is invalid" });
        }
    }
}


// RESET PASSWORD FUNCTION
exports.forgot = async (req, res, next) => {
    const { email } = req.body;

    // 1. FIND EMAIL THROUGH DATABASE
    // 2. SEND PASSWORD RESTORATION EMAIL (through template) TO USER
    // 3. ???
    // 4. SUCCESS

}

async function hash_p(pwd, rounds) {
    const salt = await bcrypt.genSalt(rounds);
    const h_pwd = await bcrypt.hash(pwd, salt);

    return h_pwd;
}