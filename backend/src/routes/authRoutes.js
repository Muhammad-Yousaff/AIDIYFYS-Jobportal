const express = require('express');
const router = express.Router();
const { register, login, forgotPassword, resetPassword, verifyToken } = require('../controllers/authController');

// Auth Routes
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/verify-token', verifyToken);

module.exports = router;
