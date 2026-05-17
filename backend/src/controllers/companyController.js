const Company = require('../models/Company');
const User = require('../models/User');

// Create Company
exports.createCompany = async (req, res) => {
  try {
    const {
      name, email, phone, website, location, industry,
      companySize, description, foundedYear, socialLinks
    } = req.body;

    // Check if company already exists
    const existingCompany = await Company.findOne({ email: email.toLowerCase() });
    if (existingCompany) {
      return res.status(400).json({ success: false, message: 'Company already registered' });
    }

    const company = await Company.create({
      name,
      email: email.toLowerCase(),
      phone,
      website,
      location,
      industry,
      companySize,
      description,
      foundedYear,
      socialLinks,
      recruiters: [req.user.id]
    });

    // Update user company
    await User.findByIdAndUpdate(req.user.id, { company: company._id });

    res.status(201).json({
      success: true,
      message: 'Company created successfully',
      company
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Company Details
exports.getCompanyDetails = async (req, res) => {
  try {
    const { companyId } = req.params;

    const company = await Company.findById(companyId)
      .populate('recruiters', 'name email')
      .populate('jobs');

    if (!company) {
      return res.status(404).json({ success: false, message: 'Company not found' });
    }

    res.status(200).json({ success: true, company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Companies
exports.getAllCompanies = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;

    let filter = { isActive: true };
    if (search) {
      filter.$or = [
        { name: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') }
      ];
    }

    const skip = (page - 1) * limit;

    const companies = await Company.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Company.countDocuments(filter);

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

// Update Company
exports.updateCompany = async (req, res) => {
  try {
    const { companyId } = req.params;
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({ success: false, message: 'Company not found' });
    }

    // Check authorization
    if (!company.recruiters.includes(req.user.id) && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    const updatedCompany = await Company.findByIdAndUpdate(companyId, req.body, { new: true, runValidators: true });

    res.status(200).json({
      success: true,
      message: 'Company updated successfully',
      company: updatedCompany
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Upload Company Logo
exports.uploadCompanyLogo = async (req, res) => {
  try {
    const { companyId } = req.params;

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ success: false, message: 'Company not found' });
    }

    company.logo = `uploads/${req.file.filename}`;
    await company.save();

    res.status(200).json({
      success: true,
      message: 'Logo uploaded successfully',
      logo: company.logo
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Company Stats
exports.getCompanyStats = async (req, res) => {
  try {
    const { companyId } = req.params;

    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ success: false, message: 'Company not found' });
    }

    res.status(200).json({
      success: true,
      stats: {
        totalJobs: company.jobsCount,
        totalApplicants: company.applicantsCount,
        totalRecruiters: company.recruiters.length,
        createdAt: company.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
