const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
  getUserProfile,
  updateUserProfile,
  uploadProfilePicture,
  changePassword,
  saveJob,
  removeSavedJob,
  getSavedJobs,
  deleteAccount
} = require('../controllers/userController');

// User Routes
router.get('/profile', authMiddleware, getUserProfile);
router.put('/profile', authMiddleware, updateUserProfile);
router.post('/upload-profile-picture', authMiddleware, upload.single('profileImage'), uploadProfilePicture);
router.post('/change-password', authMiddleware, changePassword);
router.post('/save-job', authMiddleware, saveJob);
router.post('/remove-saved-job', authMiddleware, removeSavedJob);
router.get('/saved-jobs', authMiddleware, getSavedJobs);
router.delete('/account', authMiddleware, deleteAccount);

module.exports = router;
