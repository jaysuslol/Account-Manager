//const form = document.getElementById('signupform');
const username = document.getElementById('username').getAttribute('value');
const pwd = document.getElementById('pwd').getAttribute('value');
const signupButton = document.getElementById('signupButton');

/*
form.addEventListener("submit", event => {
    event.preventDefault();
    alert("this is working");

    dbConn.then(conn => {
        conn.query(`INSERT INTO accounts(username, h_pass, email) VALUES(${username}, ${pwd}, "test")`);
        console.log("Account created");
    })  
});
*/

signupButton.addEventListener("click", event => {
    event.preventDefault();

    for (var i = 0; i < sessionStorage.length; i++) {
        console.log(sessionStorage.key(i));
    }

    dbConn.then(conn => {
        conn.query(`INSERT INTO accounts(username, h_pass, email) VALUES(${username}, ${pwd}, "test")`);
        console.log("Account created");
    })
});