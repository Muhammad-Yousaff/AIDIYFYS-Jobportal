const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a blog title'],
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  content: {
    type: String,
    required: [true, 'Please provide blog content']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    enum: ['Career Tips', 'Interview Prep', 'Industry News', 'Company Culture', 'Technology', 'Other'],
    required: true
  },
  featuredImage: {
    type: String,
    default: null
  },
  tags: [String],
  excerpt: {
    type: String,
    maxlength: 500
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: [{
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
  status: {
    type: String,
    enum: ['Draft', 'Published'],
    default: 'Draft'
  },
  publishedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for search
blogSchema.index({ title: 'text', content: 'text' });
blogSchema.index({ slug: 1 });
blogSchema.index({ author: 1, status: 1 });

module.exports = mongoose.model('Blog', blogSchema);
