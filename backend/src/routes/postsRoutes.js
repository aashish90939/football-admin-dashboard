import express from 'express';
import {
  getPosts,
  createPost,
  updatePost,
  deletePost
} from '../controllers/postsController.js';

const router = express.Router();

// GET all posts (optionally filter by type)
router.get('/', getPosts); // e.g., /api/posts?type=event

// POST new post (admin creates news, events, updates)
router.post('/', createPost);

// PUT to update an existing post
router.put('/:id', updatePost);

// DELETE a post (optional, if you want to allow deletion)
router.delete('/:id', deletePost);

export default router;
