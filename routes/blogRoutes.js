const blogController = require('../controllers/blogController');
const express = require('express');

const router = express.Router();

router.post('/posts', blogController.createBlog);

router.get('/posts', blogController.getBlogs);

router.get('/posts/:id', blogController.getBlogWithId);

router.put('/posts/:id', blogController.updateBlogWithId);

router.delete('/posts/:id', blogController.deleteBlogWithId);

module.exports = router;