const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../index');

// Middleware to verify token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to authenticate token' });
        }
        req.userid = decoded.userid;
        next();
    });
};

module.exports = {
    verifyToken
};