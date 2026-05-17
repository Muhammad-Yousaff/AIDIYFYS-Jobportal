const Application = require('../models/Application');
const Job = require('../models/Job');
const User = require('../models/User');

// Apply for Job
exports.applyForJob = async (req, res) => {
  try {
    const { jobId, coverLetter } = req.body;
    const applicantId = req.user.id;

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({ jobId, applicantId });
    if (existingApplication) {
      return res.status(400).json({ success: false, message: 'You have already applied for this job' });
    }

    // Check if deadline passed
    if (new Date() > new Date(job.applicationDeadline)) {
      return res.status(400).json({ success: false, message: 'Application deadline has passed' });
    }

    // Get user resume
    const user = await User.findById(applicantId);
    if (!user.resume) {
      return res.status(400).json({ success: false, message: 'Please upload your resume first' });
    }

    // Create application
    const application = await Application.create({
      jobId,
      applicantId,
      recruiterId: job.postedBy,
      companyId: job.company,
      coverLetter,
      resume: user.resume
    });

    // Update job applicant count
    job.applicantCount += 1;
    await job.save();

    // Update company applicant count
    const company = await Company.findById(job.company);
    if (company) {
      company.applicantsCount += 1;
      await company.save();
    }

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      application
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get User Applications
exports.getUserApplications = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const applicantId = req.user.id;

    let filter = { applicantId };
    if (status) filter.status = status;

    const skip = (page - 1) * limit;

    const applications = await Application.find(filter)
      .populate('jobId')
      .populate('companyId', 'name logo')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ appliedAt: -1 });

    const total = await Application.countDocuments(filter);

    res.status(200).json({
      success: true,
      applications,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Job Applications (Recruiter)
exports.getJobApplications = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { page = 1, limit = 10, status } = req.query;

    // Check if recruiter posted this job
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    if (job.postedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Unauthorized access' });
    }

    let filter = { jobId };
    if (status) filter.status = status;

    const skip = (page - 1) * limit;

    const applications = await Application.find(filter)
      .populate('applicantId', 'name email phone location profileImage resume')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ appliedAt: -1 });

    const total = await Application.countDocuments(filter);

    res.status(200).json({
      success: true,
      applications,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Application Status (Recruiter)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status, feedback, rating } = req.body;

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    // Check authorization
    if (application.recruiterId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    application.status = status;
    if (feedback) application.feedback = feedback;
    if (rating) application.rating = rating;
    application.reviewedAt = new Date();

    // Add notification
    if (status === 'Interview') {
      application.notifications.push({
        type: 'Interview Scheduled',
        message: 'You have been shortlisted for an interview'
      });
    } else if (status === 'Accepted') {
      application.notifications.push({
        type: 'Status Update',
        message: 'Congratulations! Your application has been accepted'
      });
    } else if (status === 'Rejected') {
      application.notifications.push({
        type: 'Status Update',
        message: 'Thank you for your application. We regret to inform you...'
      });
    }

    await application.save();

    res.status(200).json({
      success: true,
      message: 'Application status updated',
      application
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Withdraw Application
exports.withdrawApplication = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const applicantId = req.user.id;

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    if (application.applicantId.toString() !== applicantId) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    application.status = 'Withdrawn';
    await application.save();

    res.status(200).json({
      success: true,
      message: 'Application withdrawn successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add Interview Note (Recruiter)
exports.addInterviewNote = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { content } = req.body;

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    if (application.recruiterId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    application.notes.push({
      author: req.user.id,
      content
    });

    await application.save();

    res.status(200).json({
      success: true,
      message: 'Note added successfully',
      application
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Application Statistics
exports.getApplicationStats = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    if (job.postedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    const stats = await Application.aggregate([
      { $match: { jobId: job._id } },
      { $group: {
        _id: '$status',
        count: { $sum: 1 }
      }}
    ]);

    res.status(200).json({
      success: true,
      totalApplications: job.applicantCount,
      stats
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
