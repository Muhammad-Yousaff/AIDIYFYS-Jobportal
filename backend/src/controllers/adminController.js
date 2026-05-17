const User = require('../models/User');
const Job = require('../models/Job');
const Application = require('../models/Application');
const Company = require('../models/Company');

// Get Dashboard Statistics
exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalJobs = await Job.countDocuments();
    const totalApplications = await Application.countDocuments();
    const totalCompanies = await Company.countDocuments();

    const jobSeekers = await User.countDocuments({ role: 'job_seeker' });
    const recruiters = await User.countDocuments({ role: 'recruiter' });

    const openJobs = await Job.countDocuments({ status: 'Open' });
    const closedJobs = await Job.countDocuments({ status: 'Closed' });

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalJobs,
        totalApplications,
        totalCompanies,
        jobSeekers,
        recruiters,
        openJobs,
        closedJobs
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Users (Admin)
exports.getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, role } = req.query;

    let filter = {};
    if (role) filter.role = role;

    const skip = (page - 1) * limit;

    const users = await User.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-password')
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(filter);

    res.status(200).json({
      success: true,
      users,
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

// Block/Unblock User
exports.toggleUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.status(200).json({
      success: true,
      message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Verify Company
exports.verifyCompany = async (req, res) => {
  try {
    const { companyId } = req.params;

    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ success: false, message: 'Company not found' });
    }

    company.isVerified = true;
    await company.save();

    res.status(200).json({
      success: true,
      message: 'Company verified successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Job (Admin)
exports.deleteJobAdmin = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    // Remove from company
    const company = await Company.findById(job.company);
    if (company) {
      company.jobs = company.jobs.filter(id => id.toString() !== jobId);
      company.jobsCount = company.jobs.length;
      await company.save();
    }

    await Job.findByIdAndDelete(jobId);

    res.status(200).json({ success: true, message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Companies (Admin)
exports.getAllCompaniesAdmin = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    const companies = await Company.find({})
      .skip(skip)
      .limit(parseInt(limit))
      .populate('recruiters', 'name email')
      .sort({ createdAt: -1 });

    const total = await Company.countDocuments();

    res.status(200).json({
      success: true,
      companies,
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

// Reports & Analytics
exports.getAnalytics = async (req, res) => {
  try {
    // Applications by status
    const applicationStats = await Application.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    // Jobs by category
    const jobsByCategory = await Job.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    // Applications by month (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const applicationsByMonth = await Application.aggregate([
      { $match: { appliedAt: { $gte: sixMonthsAgo } } },
      { $group: {
        _id: {
          year: { $year: '$appliedAt' },
          month: { $month: '$appliedAt' }
        },
        count: { $sum: 1 }
      }},
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    res.status(200).json({
      success: true,
      analytics: {
        applicationStats,
        jobsByCategory,
        applicationsByMonth
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
