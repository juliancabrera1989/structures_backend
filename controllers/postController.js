// import Post from '../models/Post.js';
// import Comment from '../models/Comment.js';

// // existing getPosts, getPost, createPost...

// export const createComment = async (req, res) => {
//   try {
//     const { body } = req.body;
//     const { id: postId } = req.params;

//     if (!body?.trim()) {
//       return res.status(400).json({ message: 'Comment body is required' });
//     }

//     const post = await Post.findById(postId);
//     if (!post) {
//       return res.status(404).json({ message: 'Post not found' });
//     }

//     const comment = await Comment.create({
//       body,
//       author: req.user._id,
//       post: postId
//     });

//     res.status(201).json(await comment.populate('author', 'username'));
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to create comment' });
//   }
// };


const Post = require('../models/Post');

// Get all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'username email');
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get single post
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username email');
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Create post
exports.createPost = async (req, res) => {
  try {
   const { title, content, tags } = req.body;

    if (!title?.trim() || !content?.trim()) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const newPost = new Post({
      title: title.trim(),
      content: content.trim(),
      author: req.user._id,
      tags: tags?.map(t => t.trim()).filter(Boolean) || []
    });

    const saved = await newPost.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};


// export const createPost = async (req, res) => {
//   try {
//     const { title, content, tags } = req.body;

//     if (!title?.trim() || !content?.trim()) {
//       return res.status(400).json({ error: 'Title and content are required' });
//     }

//     const newPost = new Post({
//       title: title.trim(),
//       content: content.trim(),
//       author: req.user._id,
//       tags: tags?.map(t => t.trim()).filter(Boolean) || []
//     });

//     const saved = await newPost.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// };




// // Add comment
// exports.createComment = async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (!post) return res.status(404).json({ error: 'Post not found' });

//     if (!req.body.content?.trim()) {
//       return res.status(400).json({ error: 'Comment content is required' });
//     }

//     post.comments.push({
//       content: req.body.content,
//       author: req.user.id
//     });

//     await post.save();
//     res.status(201).json(post);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// };


// Add comment
exports.createComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    if (!req.body.content?.trim()) {
      return res.status(400).json({ error: 'Comment content is required' });
    }

    const newComment = {
      content: req.body.content,
      author: req.user.id,
      createdAt: new Date()
    };

    post.comments.push(newComment);
    await post.save();

    // send only the last inserted comment back
    res.status(201).json(post.comments[post.comments.length - 1]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};