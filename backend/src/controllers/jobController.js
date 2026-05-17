const Job = require('../models/Job');
const Application = require('../models/Application');
const Company = require('../models/Company');

// Create Job (Recruiter)
exports.createJob = async (req, res) => {
  try {
    const {
      title, description, location, jobType, category, salaryMin, salaryMax,
      requiredSkills, experience, qualifications, responsibilities, benefits,
      applicationDeadline, companyId
    } = req.body;

    // Validation
    if (!title || !description || !location || !jobType || !category) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ success: false, message: 'Company not found' });
    }

    const job = await Job.create({
      title,
      description,
      location,
      jobType,
      category,
      salaryMin,
      salaryMax,
      requiredSkills,
      experience,
      qualifications,
      responsibilities,
      benefits,
      applicationDeadline,
      company: companyId,
      postedBy: req.user.id
    });

    // Update company job count
    company.jobs.push(job._id);
    company.jobsCount = company.jobs.length;
    await company.save();

    res.status(201).json({
      success: true,
      message: 'Job created successfully',
      job
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Jobs
exports.getAllJobs = async (req, res) => {
  try {
    const { page = 1, limit = 10, location, category, jobType, search } = req.query;

    let filter = { status: 'Open', isActive: true };

    if (location) filter.location = new RegExp(location, 'i');
    if (category) filter.category = category;
    if (jobType) filter.jobType = jobType;
    if (search) {
      filter.$or = [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') }
      ];
    }

    const skip = (page - 1) * limit;

    const jobs = await Job.find(filter)
      .populate('company')
      .populate('postedBy', 'name email')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Job.countDocuments(filter);

    res.status(200).json({
      success: true,
      jobs,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalJobs: total
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Job By ID
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('company')
      .populate('postedBy', 'name email');

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    res.status(200).json({ success: true, job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Job (Recruiter)
exports.updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    if (job.postedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Unauthorized to update this job' });
    }

    const updatedJob = await Job.findByIdAndUpdate(jobId, req.body, { new: true, runValidators: true });

    res.status(200).json({
      success: true,
      message: 'Job updated successfully',
      job: updatedJob
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Job (Recruiter)
exports.deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    if (job.postedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Unauthorized to delete this job' });
    }

    // Remove job from company
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

// Close Job
exports.closeJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    job.status = 'Closed';
    await job.save();

    res.status(200).json({ success: true, message: 'Job closed successfully', job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Company Jobs
exports.getCompanyJobs = async (req, res) => {
  try {
    const { companyId } = req.params;
    const { status } = req.query;

    let filter = { company: companyId };
    if (status) filter.status = status;

    const jobs = await Job.find(filter).populate('company').sort({ createdAt: -1 });

    res.status(200).json({ success: true, jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Search Jobs
exports.searchJobs = async (req, res) => {
  try {
    const { query, page = 1, limit = 10 } = req.query;

    if (!query) {
      return res.status(400).json({ success: false, message: 'Search query is required' });
    }

    const skip = (page - 1) * limit;

    const jobs = await Job.find(
      { $text: { $search: query }, status: 'Open' },
      { score: { $meta: 'textScore' } }
    )
      .sort({ score: { $meta: 'textScore' } })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('company');

    const total = await Job.countDocuments({ $text: { $search: query }, status: 'Open' });

    res.status(200).json({
      success: true,
      jobs,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalJobs: total
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
