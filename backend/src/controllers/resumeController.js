const User = require('../models/User');
const path = require('path');
const fs = require('fs');
const pdfParse = require('pdf-parse');

// Upload Resume
exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const user = await User.findById(req.user.id);

    // Delete old resume if exists
    if (user.resume && user.resume.url) {
      const oldFilePath = path.join(__dirname, '../../' + user.resume.url);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }

    user.resume = {
      filename: req.file.originalname,
      url: `uploads/${req.file.filename}`,
      uploadedAt: new Date()
    };

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Resume uploaded successfully',
      resume: user.resume
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Analyze Resume (AI Resume Analyzer)
exports.analyzeResume = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user.resume || !user.resume.url) {
      return res.status(400).json({ success: false, message: 'No resume uploaded' });
    }

    // In a real implementation, integrate with an LLM API (like OpenAI, HuggingFace, etc.)
    // For now, we'll return a mock analysis
    const mockAnalysis = {
      skills: [
        'JavaScript', 'React', 'Node.js', 'MongoDB', 'Express',
        'REST APIs', 'Problem Solving', 'Team Leadership'
      ],
      score: 78,
      suggestions: [
        'Add more specific project achievements with metrics',
        'Include quantifiable results (e.g., improved performance by 30%)',
        'Add certifications or continuous learning courses',
        'Highlight collaboration and team leadership experiences'
      ],
      summary: 'Strong technical foundation with good software development skills. Consider adding more project details and measurable achievements to strengthen the resume.'
    };

    user.resume.analysisResult = mockAnalysis;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Resume analyzed successfully',
      analysis: mockAnalysis
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Resume Analysis
exports.getResumeAnalysis = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user.resume || !user.resume.analysisResult) {
      return res.status(404).json({ success: false, message: 'No analysis available' });
    }

    res.status(200).json({
      success: true,
      analysis: user.resume.analysisResult
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Resume
exports.deleteResume = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user.resume && user.resume.url) {
      const filePath = path.join(__dirname, '../../' + user.resume.url);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    user.resume = null;
    await user.save();

    res.status(200).json({ success: true, message: 'Resume deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Download Resume
exports.downloadResume = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user.resume || !user.resume.url) {
      return res.status(404).json({ success: false, message: 'No resume found' });
    }

    const filePath = path.join(__dirname, '../../' + user.resume.url);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ success: false, message: 'Resume file not found' });
    }

    res.download(filePath, user.resume.filename);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// CV Builder - Save CV Template
exports.saveCVTemplate = async (req, res) => {
  try {
    const { cvData } = req.body;
    const user = await User.findById(req.user.id);

    user.cvTemplate = cvData;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'CV template saved successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get CV Template
exports.getCVTemplate = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user.cvTemplate) {
      return res.status(404).json({ success: false, message: 'No CV template found' });
    }

    res.status(200).json({
      success: true,
      cvTemplate: user.cvTemplate
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
