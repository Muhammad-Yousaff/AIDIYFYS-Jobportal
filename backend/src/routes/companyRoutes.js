const express = require('express');
const router = express.Router();
const { authMiddleware, recruiterMiddleware } = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
  createCompany,
  getCompanyDetails,
  getAllCompanies,
  updateCompany,
  uploadCompanyLogo,
  getCompanyStats
} = require('../controllers/companyController');

// Company Routes
router.post('/', recruiterMiddleware, createCompany);
router.get('/', getAllCompanies);
router.get('/:companyId', getCompanyDetails);
router.put('/:companyId', recruiterMiddleware, updateCompany);
router.post('/:companyId/logo', recruiterMiddleware, upload.single('logo'), uploadCompanyLogo);
router.get('/:companyId/stats', recruiterMiddleware, getCompanyStats);

module.exports = router;
