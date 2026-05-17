const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a company name'],
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide a company email'],
    unique: true,
    lowercase: true
  },
  phone: String,
  website: String,
  location: {
    type: String,
    required: true
  },
  industry: String,
  companySize: {
    type: String,
    enum: ['1-50', '50-200', '200-1000', '1000-5000', '5000+'],
    required: true
  },
  description: String,
  logo: {
    type: String,
    default: null
  },
  coverImage: {
    type: String,
    default: null
  },
  foundedYear: Number,
  socialLinks: {
    linkedin: String,
    twitter: String,
    facebook: String
  },
  recruiters: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  jobs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job'
  }],
  jobsCount: {
    type: Number,
    default: 0
  },
  applicantsCount: {
    type: Number,
    default: 0
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationDocument: String,
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Company', companySchema);
