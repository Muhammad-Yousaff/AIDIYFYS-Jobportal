const express = require('express');
const router = express.Router();
const { authMiddleware, recruiterMiddleware } = require('../middleware/auth');
const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  closeJob,
  getCompanyJobs,
  searchJobs
} = require('../controllers/jobController');

// Job Routes
router.get('/', getAllJobs);
router.get('/search', searchJobs);
router.get('/:id', getJobById);
router.post('/', recruiterMiddleware, createJob);
router.put('/:id', recruiterMiddleware, updateJob);
router.delete('/:id', recruiterMiddleware, deleteJob);
router.patch('/:id/close', recruiterMiddleware, closeJob);
router.get('/company/:companyId', getCompanyJobs);

module.exports = router;
