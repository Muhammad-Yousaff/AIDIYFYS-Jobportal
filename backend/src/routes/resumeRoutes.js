const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
  uploadResume,
  analyzeResume,
  getResumeAnalysis,
  deleteResume,
  downloadResume,
  saveCVTemplate,
  getCVTemplate
} = require('../controllers/resumeController');

// Resume Routes
router.post('/upload', authMiddleware, upload.single('resume'), uploadResume);
router.post('/analyze', authMiddleware, analyzeResume);
router.get('/analysis', authMiddleware, getResumeAnalysis);
router.delete('/', authMiddleware, deleteResume);
router.get('/download', authMiddleware, downloadResume);

// CV Builder Routes
router.post('/cv-template', authMiddleware, saveCVTemplate);
router.get('/cv-template', authMiddleware, getCVTemplate);

module.exports = router;
