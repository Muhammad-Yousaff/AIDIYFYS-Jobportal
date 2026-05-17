const User = require('../models/User');
const path = require('path');
const fs = require('fs');

// Get User Profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('company').populate('savedJobs');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update User Profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { name, bio, phone, location } = req.body;
    const userId = req.user.id;

    const updateData = {};
    if (name) updateData.name = name;
    if (bio) updateData.bio = bio;
    if (phone) updateData.phone = phone;
    if (location) updateData.location = location;
    updateData.updatedAt = new Date();

    const user = await User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true });

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Upload Profile Picture
exports.uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const user = await User.findById(req.user.id);

    // Delete old profile picture if exists
    if (user.profileImage) {
      const oldFilePath = path.join(__dirname, '../../' + user.profileImage);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }

    user.profileImage = `uploads/${req.file.filename}`;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile picture uploaded successfully',
      profileImage: user.profileImage
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Change Password
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const userId = req.user.id;

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'New passwords do not match' });
    }

    const user = await User.findById(userId).select('+password');
    const isMatch = await user.comparePassword(currentPassword);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Current password is incorrect' });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Save Job
exports.saveJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (user.savedJobs.includes(jobId)) {
      return res.status(400).json({ success: false, message: 'Job already saved' });
    }

    user.savedJobs.push(jobId);
    await user.save();

    res.status(200).json({ success: true, message: 'Job saved successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove Saved Job
exports.removeSavedJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    user.savedJobs = user.savedJobs.filter(id => id.toString() !== jobId);
    await user.save();

    res.status(200).json({ success: true, message: 'Job removed from saved' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Saved Jobs
exports.getSavedJobs = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate('savedJobs');

    res.status(200).json({
      success: true,
      savedJobs: user.savedJobs
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Account
exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const { password } = req.body;

    const user = await User.findById(userId).select('+password');
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Password is incorrect' });
    }

    await User.findByIdAndDelete(userId);

    res.status(200).json({ success: true, message: 'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
