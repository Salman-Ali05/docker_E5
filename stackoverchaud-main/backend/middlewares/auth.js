const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../utils/secrets');

module.exports = function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ status: 'error', message: 'Token required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    req.user = decoded; // <-- Ici on attache le user
    next();
  } catch (err) {
    return res.status(403).json({ status: 'error', message: 'Invalid token' });
  }
};
