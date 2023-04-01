const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    try {
        const header = req.headers['authorization'];
        if (!header) {
            return res.status(401).json({ message: 'Invalid token!' });
        }
        const token = header.split(' ');
        if (token[0] != 'DEMO') {
            return res.status(401).json({ message: 'Invalid token!' });
        }
        if (!token[1]) {
            return res.status(401).json({ message: 'Invalid token!' });
        }
        const payload = jwt.verify(token[1], process.env.SECRET_KEY);
        if (!payload) {
            return res.status(401).json({ message: 'Unauthorized!' });
        }
        req.payload = payload;
        next();
    } catch (error) {
        req.payload = null;
        return res.status(401).json({ message: 'Unauthorized!' });
    }
};

module.exports = verifyToken;