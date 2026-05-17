const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ success: false, message: 'Invalid or expired token' });
  }
};

const adminMiddleware = (req, res, next) => {
  authMiddleware(req, res, () => {
    if (req.user.role === 'admin') {
      next();
    } else {
      return res.status(403).json({ success: false, message: 'Admin access required' });
    }
  });
};

const recruiterMiddleware = (req, res, next) => {
  authMiddleware(req, res, () => {
    if (req.user.role === 'recruiter' || req.user.role === 'admin') {
      next();
    } else {
      return res.status(403).json({ success: false, message: 'Recruiter access required' });
    }
  });
};

module.exports = { authMiddleware, adminMiddleware, recruiterMiddleware };
