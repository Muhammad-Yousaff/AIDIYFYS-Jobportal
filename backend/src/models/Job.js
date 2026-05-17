const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a job title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a job description']
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: [true, 'Please provide a company']
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  location: {
    type: String,
    required: [true, 'Please provide a location']
  },
  jobType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'],
    required: true
  },
  category: {
    type: String,
    enum: ['Technology', 'Finance', 'Healthcare', 'Education', 'Retail', 'Manufacturing', 'Other'],
    required: true
  },
  salaryMin: {
    type: Number,
    required: true
  },
  salaryMax: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'USD'
  },
  requiredSkills: [{
    type: String,
    trim: true
  }],
  experience: {
    type: String,
    enum: ['Entry Level', '1-2 years', '3-5 years', '5-10 years', '10+ years'],
    required: true
  },
  qualifications: [{
    type: String,
    trim: true
  }],
  responsibilities: [{
    type: String,
    trim: true
  }],
  benefits: [{
    type: String,
    trim: true
  }],
  applicationDeadline: {
    type: Date,
    required: true
  },
  applicantCount: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['Open', 'Closed', 'On Hold'],
    default: 'Open'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for better search performance
jobSchema.index({ title: 'text', description: 'text', location: 'text', category: 'text' });
jobSchema.index({ company: 1, status: 1 });
jobSchema.index({ postedBy: 1 });

module.exports = mongoose.model('Job', jobSchema);
