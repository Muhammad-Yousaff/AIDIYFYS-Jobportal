const express = require('express');
const router = express.Router();
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const {
  getDashboardStats,
  getAllUsers,
  toggleUserStatus,
  verifyCompany,
  deleteJobAdmin,
  getAllCompaniesAdmin,
  getAnalytics
} = require('../controllers/adminController');

// Admin Routes - All require admin authentication
router.get('/dashboard/stats', adminMiddleware, getDashboardStats);
router.get('/users', adminMiddleware, getAllUsers);
router.patch('/users/:userId/toggle-status', adminMiddleware, toggleUserStatus);
router.patch('/companies/:companyId/verify', adminMiddleware, verifyCompany);
router.delete('/jobs/:jobId', adminMiddleware, deleteJobAdmin);
router.get('/companies', adminMiddleware, getAllCompaniesAdmin);
router.get('/analytics', adminMiddleware, getAnalytics);

module.exports = router;
