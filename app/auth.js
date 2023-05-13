const { json } = require('body-parser');
const bcrypt = require('bcrypt');
const dbConn = require('./dbServer.js');

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
    dbConn.then(async conn => {
        await conn.query(`INSERT INTO accounts(username, h_pass, email) VALUES("${username}", "${hashed_p}", "${email}")`);
        console.log("Account created");
    }).catch (err => {
        throw err;
    })
    
    return res.status(200).json({ message: "Sign up successful" });
}

// LOGIN FUNCTION
exports.login = async (req, res, next) => {
    const { username, pwd } = req.body;
    let h_pass;

    if (!username || !pwd) {
      return res.status(400).json({ message: "Username or password are empty" })
    }

    dbConn.then(async conn => {
        await conn.query(`SELECT h_pass FROM accounts WHERE username = "${username}";`).then( rows => {
            h_pass = rows[0].h_pass; // Grab password from database
        }).catch(err => {
            throw err;
        });

        const compPass = await bcrypt.compare(pwd, h_pass);
        if (compPass) {
            return res.status(200).json({ message: "Login successful" });
        } else {
            return res.status(401).json({ message: "Password is invalid" });
        }
    });
}

async function hash_p(pwd, rounds) {
    const salt = await bcrypt.genSalt(rounds);
    const h_pwd = await bcrypt.hash(pwd, salt);

    return h_pwd;
}