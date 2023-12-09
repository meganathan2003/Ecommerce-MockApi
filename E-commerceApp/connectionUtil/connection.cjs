
// /**
//  * @import(mysql)
//  * @import(fs) filesystem
//  */
// // import { readFileSync } from 'fs/promises';
// import {readFileSync} from 'fs';
// import { createConnection } from 'mysql';


// // Read the content from the db.json file
// function readHandleJson() {
//     // Create connection to the data base
//     const connection = createConnection({
//         host: 'localhost',
//         user: 'root', // Replace 'myuser' with your database username
//         password: 'root', // Replace 'mypassword' with your database password
//         database: 'ecommerce' // Replace 'myappdb' with your database name
//     })

//     // connect to the DB
//     connection.connect((err) => {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         console.log("connected to DB");
//     })
//     try {
//         const jsonData = readFileSync('../../db.json', 'utf-8');

//         // Parse the json data into the js obj
//         const data = JSON.parse(jsonData);

//         /**
//          * Get the details from the users table
//          * @callback(err,rows)
//          * below we give the two parameter because connection method take a callback function.
//          */

//         const tblName = "users";

//         if (data && Array.isArray(data.users)) {
//             data.users.forEach(async (user) => {
//                 const insertQuery = `INSERT INTO ${tblName} (email,password,id) VALUES (?, ?, ?)`;
//                 await connection.query(insertQuery, [user.email, user.pass, user.id]);
//             });
//             console.log("data inserted sucess");
//         } else {
//             console.error('Data is not an array');
//         }
//     } catch (err) {
//         console.log("Error reading or processing data", err);
//     }

//     // Don't forget to close the connection when done with database operations
//     connection.end((err) => {
//         if (err) {
//             console.error('Error closing connection:', err);
//             return;
//         }
//         console.log('Connection closed.');
//     })
// };
// readHandleJson();

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

// Parse URL-encoded bodies (for form data)
app.use(bodyParser.urlencoded({ extended: true }));

// Create MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace 'myuser' with your database username
    password: 'root', // Replace 'mypassword' with your database password
    database: 'ecommerce' // Replace 'myappdb' with your database name
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to the database');
});

// Endpoint to handle form submission
app.post('/submitUserData', (req, res) => {
    // Extract user data from the request (assuming form data is sent in JSON format)
    const { email, password } = req.body;

    // Insert user data into the database
    const insertQuery = 'INSERT INTO users (email, password) VALUES (?, ?)';
    connection.query(insertQuery, [email, password], (err, result) => {
        if (err) {
            console.error('Error storing user data:', err);
            res.status(500).send('Error storing user data');
            return;
        }
        console.log('User data inserted successfully');
        res.status(200).send('User data inserted successfully');
    });
});

// Start the server
const PORT = 5500;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
