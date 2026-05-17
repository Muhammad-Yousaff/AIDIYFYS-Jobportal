const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  applicantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recruiterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  resume: {
    filename: String,
    url: String
  },
  coverLetter: {
    type: String
  },
  status: {
    type: String,
    enum: ['Applied', 'Under Review', 'Interview', 'Rejected', 'Accepted', 'Withdrawn'],
    default: 'Applied'
  },
  rating: {
    type: Number,
    min: 0,
    max: 5
  },
  feedback: {
    type: String
  },
  appliedAt: {
    type: Date,
    default: Date.now
  },
  reviewedAt: Date,
  interviewScheduledAt: Date,
  decisionAt: Date,
  notes: [{
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    content: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  notifications: [{
    type: {
      type: String,
      enum: ['Status Update', 'Interview Scheduled', 'Message'],
      default: 'Status Update'
    },
    message: String,
    read: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
});

// Index for quick lookups
applicationSchema.index({ jobId: 1, applicantId: 1 }, { unique: true });
applicationSchema.index({ applicantId: 1, status: 1 });
applicationSchema.index({ recruiterId: 1, status: 1 });
applicationSchema.index({ appliedAt: -1 });

module.exports = mongoose.model('Application', applicationSchema);
