const express = require('express');
const router = express.Router();

const { createBlog, getAllBlogs, updateBlog, deleteBlog, getBlogById, getBlogBySlug } = require('../controller/blogController');

router.get('/', getAllBlogs)

router.get('/:id', getBlogById)

router.get('/blog/:slug', getBlogBySlug)

router.post('/new', createBlog)

router.put('/:id', updateBlog)

router.delete('/:id', deleteBlog)

module.exports = router