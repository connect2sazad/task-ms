const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { app, db, jwtSecret } = require('../index');
const { verifyToken } = require('./middleware');


// login
app.post('/login', (req, res) => {

    const { email, password } = req.body;

    const query = "SELECT * FROM users WHERE email = ? OR userid = ?";

    db.execute(query, [email, email], async (err, results) => {

        if (err || results.length === 0) {
            return res.status(403).json({ message: "Authentication failed" });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Authentication failed" });
        }

        const token = jwt.sign({ userid: user.userid, email: user.email }, jwtSecret, { expiresIn: '1h' });

        res.status(200).json({
            message: 'Authentication successful',
            token,
            userid: user.userid
        });
    });
});

// register
app.post('/users/create', verifyToken, async (req, res) => {

    const { first_name, last_name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const query = "INSERT INTO users (first_name, last_name, email, password, role) VALUES (?, ?, ?, ?, 1)";

    db.query(query, [first_name, last_name, email, hashedPassword], (err, result) => {

        if (err) {

            return res.status(500).json({ message: "Registration failed", error: err.message });

        }

        res.status(201).json({ message: 'User registered successfully', id: result.insertId });

    });

});

// list users
app.get('/users', verifyToken, (req, res) => {

    const query = "SELECT * FROM users WHERE is_deleted = 0";

    db.query(query, [], (err, results) => {

        if (err) {

            return res.status(500).json({ message: "Users not listed", error: err.message });

        }

        // to remove password column
        const users = results.map(user => {
            const { password, ...rest } = user;
            return rest;
        });

        res.status(201).json({ 
            message: 'Users listed successfully',
            users,
        });

    });

});

app.get('/verify-auth', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Verified', userid: req.userid });
});

app.get('/profile', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Welcome to your profile', userid: req.userid });
});