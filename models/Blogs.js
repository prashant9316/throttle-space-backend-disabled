const mongoose = require('mongoose')
const marked = require('marked');
const sanitizeHtml = require('sanitize-html');
const slugify = require('slugify');

// Function to convert Markdown to HTML and sanitize it
const markdownToHtml = (markdownContent) => {
    return new Promise((resolve, reject) => {
      if (!markdownContent) {
        resolve('');
      } else {
        marked(markdownContent, (err, content) => {
          if (err) {
            reject(err);
          } else {
            // Sanitize the HTML content
            const sanitizedHtml = sanitizeHtml(content, {
              allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']), // Allow img tags
              allowedAttributes: {
                img: ['src', 'alt'] // Allow src and alt attributes for img tags
              }
              // Add other sanitize-html options as needed
            });
            resolve(sanitizedHtml);
          }
        });
      }
    });
  };

const createSlug = (title) => {
    const options = {
      lower: true, // Convert slug to lowercase
      remove: /[*+~.()'"!:@]/g, // Remove special characters from the slug
    };
  
    return slugify(title, options);
  };

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    desc: {type: String},
    author: {type: String},
    contentMarkdown: { type: String, required: true },
    contentHTML: { type: String },
    slug: { type: String, unique: true },
    thumbnailLink: { type: String }, // Field for thumbnail link
    mainHeaderImageRef: { type: String }, // Field for main header link
    state: {
      type: Boolean,
      default: true,
      required: true
    },
  },
    {
      timestamps: true
    }
  );

  blogSchema.pre('save', async function (next) {
    try {
      // // Convert Markdown to HTML
      // if (this.isModified('contentMarkdown') || this.isNew) {
      //   this.contentHTML = await markdownToHtml(this.contentMarkdown);
      // }

      // Generate slug from the title
      // if (!this.slug || this.isModified('title')) {
      this.slug = createSlug(this.title);
      // }
  
      next();
    } catch (error) {
      next(error);
    }
  });
  
  // Model Definition
  const Blog = mongoose.model('Blog', blogSchema);
  
  module.exports = Blog;