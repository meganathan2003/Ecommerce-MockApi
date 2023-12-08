
/**
 * @import(mysql)
 * @import(fs) filesystem
 */
// import { readFileSync } from 'fs/promises';
import {readFileSync} from 'fs';
import { createConnection } from 'mysql';


// Read the content from the db.json file
function readHandleJson() {
    // Create connection to the data base
    const connection = createConnection({
        host: 'localhost',
        user: 'root', // Replace 'myuser' with your database username
        password: 'root', // Replace 'mypassword' with your database password
        database: 'ecommerce' // Replace 'myappdb' with your database name
    })

    // connect to the DB
    connection.connect((err) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("connected to DB");
    })
    try {
        const jsonData = readFileSync('../../db.json', 'utf-8');

        // Parse the json data into the js obj
        const data = JSON.parse(jsonData);

        /**
         * Get the details from the users table
         * @callback(err,rows)
         * below we give the two parameter because connection method take a callback function.
         */

        const tblName = "users";

        if (data && Array.isArray(data.users)) {
            data.users.forEach(async (user) => {
                const insertQuery = `INSERT INTO ${tblName} (email,password,id) VALUES (?, ?, ?)`;
                await connection.query(insertQuery, [user.email, user.pass, user.id]);
            });
            console.log("data inserted sucess");
        } else {
            console.error('Data is not an array');
        }
    } catch (err) {
        console.log("Error reading or processing data", err);
    }

    // Don't forget to close the connection when done with database operations
    connection.end((err) => {
        if (err) {
            console.error('Error closing connection:', err);
            return;
        }
        console.log('Connection closed.');
    })
};
readHandleJson();