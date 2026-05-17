const validator = require('validator');

// Validate Email
const validateEmail = (email) => {
  return validator.isEmail(email);
};

// Validate Password
const validatePassword = (password) => {
  return password.length >= 6;
};

// Validate Phone
const validatePhone = (phone) => {
  return validator.isMobilePhone(phone, 'any');
};

// Validate URL
const validateURL = (url) => {
  return validator.isURL(url);
};

// Validate Job Data
const validateJobData = (jobData) => {
  const errors = [];

  if (!jobData.title || jobData.title.trim().length === 0) {
    errors.push('Job title is required');
  }

  if (!jobData.description || jobData.description.trim().length === 0) {
    errors.push('Job description is required');
  }

  if (!jobData.location || jobData.location.trim().length === 0) {
    errors.push('Location is required');
  }

  if (!jobData.salaryMin || jobData.salaryMin < 0) {
    errors.push('Valid minimum salary is required');
  }

  if (!jobData.salaryMax || jobData.salaryMax < jobData.salaryMin) {
    errors.push('Maximum salary must be greater than minimum salary');
  }

  if (!jobData.applicationDeadline || new Date(jobData.applicationDeadline) < new Date()) {
    errors.push('Valid application deadline is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Validate User Registration
const validateUserRegistration = (userData) => {
  const errors = [];

  if (!userData.name || userData.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }

  if (!validateEmail(userData.email)) {
    errors.push('Invalid email format');
  }

  if (!validatePassword(userData.password)) {
    errors.push('Password must be at least 6 characters');
  }

  if (userData.password !== userData.confirmPassword) {
    errors.push('Passwords do not match');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

module.exports = {
  validateEmail,
  validatePassword,
  validatePhone,
  validateURL,
  validateJobData,
  validateUserRegistration
};
