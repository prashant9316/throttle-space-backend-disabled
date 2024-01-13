const marked = require('marked');
const slugify = require('slugify');
const sanitizeHtml = require('sanitize-html');

// Function to convert Markdown to HTML
const markdownToHtml = (markdownContent) => {
  return new Promise((resolve, reject) => {
    if (!markdownContent) {
      resolve('');
    } else {
      marked(markdownContent, (err, content) => {
        if (err) {
          reject(err);
        } else {
          resolve(content);
        }
      });
    }
  });
};

// Function to create a slug from a given string (title)
const createSlug = (title) => {
  const options = {
    lower: true, // Convert slug to lowercase
    remove: /[*+~.()'"!:@]/g, // Remove special characters from the slug
  };

  return slugify(title, options);
};

module.exports = {
  markdownToHtml,
  createSlug,
};
