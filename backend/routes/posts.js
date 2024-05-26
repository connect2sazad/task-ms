const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { app, db, jwtSecret } = require('../index');
const { verifyToken } = require('./middleware');

// get all posts
app.get('/posts', verifyToken, (req, res) => {

    const query = "SELECT * FROM posts WHERE is_deleted = ?";

    db.execute(query, [0], async (err, results) => {

        if (err || results.length === 0) {
            return res.status(403).json({ message: "Authentication failed" });
        }

        const posts = results;

        res.status(200).json({
            message: 'Successful',
            posts
        });

    });

});