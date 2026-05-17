const express = require('express');
const router = express.Router();
const { authMiddleware, recruiterMiddleware } = require('../middleware/auth');
const {
  applyForJob,
  getUserApplications,
  getJobApplications,
  updateApplicationStatus,
  withdrawApplication,
  addInterviewNote,
  getApplicationStats
} = require('../controllers/applicationController');

// Application Routes
router.post('/apply', authMiddleware, applyForJob);
router.get('/my-applications', authMiddleware, getUserApplications);
router.get('/job/:jobId/applications', recruiterMiddleware, getJobApplications);
router.patch('/:applicationId/status', recruiterMiddleware, updateApplicationStatus);
router.post('/:applicationId/withdraw', authMiddleware, withdrawApplication);
router.post('/:applicationId/note', recruiterMiddleware, addInterviewNote);
router.get('/job/:jobId/stats', recruiterMiddleware, getApplicationStats);

module.exports = router;
