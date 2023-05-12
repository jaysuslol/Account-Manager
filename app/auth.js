const { json } = require('body-parser');
const dbConn = require('./dbServer.js');

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

    // Insert user info to database
    dbConn.then(async conn => {
        await conn.query(`INSERT INTO accounts(username, h_pass, email) VALUES("${username}", "${pwd}", "${email}")`);
        console.log("Account created");
    }).catch (err => {
        throw err;
    })
    
    res.status(200).send('success');
}

// LOGIN FUNCTION
exports.login = async (req, res, next) => {
    const { username, pwd } = req.body;
    let h_pass;

    if (!username || !pwd) {
      return res.status(400).json({ message: "Username or password are empty" })
    }

    dbConn.then(async conn => {
        await conn.query(`SELECT h_pass FROM accounts WHERE username = "${username}";`).then( (rows) => {
            h_pass = rows[0].h_pass;

            if (pwd == h_pass) {
                return res.status(200).json({ message: "Login successful" });
            } else {
                return res.status(401).json({ message: "Password is invalid" });
            }
        }).catch(err => {
            throw err;
        });
    });
  }