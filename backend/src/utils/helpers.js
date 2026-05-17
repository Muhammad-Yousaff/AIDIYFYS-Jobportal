// Format date to readable string
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Calculate days difference
const daysDifference = (date1, date2) => {
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.floor((date1 - date2) / msPerDay);
};

// Generate slug from string
const generateSlug = (str) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Truncate text
const truncateText = (text, length = 100) => {
  return text.length > length ? text.substring(0, length) + '...' : text;
};

// Generate random string
const generateRandomString = (length = 10) => {
  return Math.random().toString(36).substr(2, length);
};

module.exports = {
  formatDate,
  daysDifference,
  generateSlug,
  truncateText,
  generateRandomString
};
