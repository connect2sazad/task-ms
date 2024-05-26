const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const { dbconfig, port, JWT_SECRET_KEY } = require('./config');

const app = express();
const PORT = process.env.PORT || port;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection(dbconfig);

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ', err);
        return;
    }
    console.log('Connected to MySQL database');
});

const jwtSecret = JWT_SECRET_KEY;

module.exports = {
    app,
    db,
    jwtSecret
};

require('./routes/users');
require('./routes/posts');
require('./routes/db');

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});