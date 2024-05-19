const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { dbconfig, port } = require('./config');

const app = express();
const PORT = process.env.PORT || port;

app.use(express.json());

const db = mysql.createConnection(dbconfig);

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ', err);
        return;
    }
    console.log('Connected to MySQL database');
});

module.exports = {
    app,
    db
};

require('./routes/users-test');

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});