// const express = require('express');
// const router = express.Router();
// const Post = require('../models/Post');
// const authMiddleware = require('../middleware/authMiddleware');

// // Get all posts
// router.get('/', async (req, res) => {
//   try {
//     const posts = await Post.find().populate('author', 'username email');
//     res.json(posts);
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Get one post by ID
// router.get('/:id', async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id).populate('author', 'username email');
//     if (!post) return res.status(404).json({ error: 'Post not found' });
//     res.json(post);
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Create a new post
// router.post('/', authMiddleware, async (req, res) => {
//   try {
//     const newPost = new Post({
//       title: req.body.title,
//       content: req.body.content,
//       author: req.user.id
//     });
//     const saved = await newPost.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });


// // Add comment
// router.post('/:id/comments', authMiddleware, async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (!post) return res.status(404).json({ error: 'Post not found' });

//     post.comments.push({ content: req.body.content, author: req.user.id });
//     await post.save();

//     res.status(201).json(post);
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const postController = require('../controllers/postController');

// Get all posts
router.get('/', postController.getPosts);

// Get one post by ID
router.get('/:id', postController.getPost);

// Create a new post
router.post('/', authMiddleware, postController.createPost);

// Add comment to a post
router.post('/:id/comments', authMiddleware, postController.createComment);

module.exports = router;

