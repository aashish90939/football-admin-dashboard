// src/controllers/postsController.js
import pool from '../config/db.js';

// GET posts (optionally filtered by type)
export const getPosts = async (req, res) => {
  try {
    const { type } = req.query;
    let query = "SELECT * FROM posts";
    const values = [];

    if (type) {
      query += " WHERE type = $1 ORDER BY created_at DESC";
      values.push(type);
    }

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// CREATE a new post
export const createPost = async (req, res) => {
  try {
    const { title, body = "", type, start_date, end_date } = req.body;

    if (!title || !type) {
      return res.status(400).json({ error: "Title and type are required" });
    }

    const result = await pool.query(
      `INSERT INTO posts (title, body, type, start_date, end_date)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [title, body, type, start_date || null, end_date || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// UPDATE an existing post
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body, start_date, end_date, is_published } = req.body;

    const result = await pool.query(
      `UPDATE posts
       SET title = $1, body = $2, start_date = $3, end_date = $4, is_published = $5, updated_at = NOW()
       WHERE id = $6 RETURNING *`,
      [title, body, start_date || null, end_date || null, is_published, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating post:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};


// DELETE /api/posts/:id
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Post ID is required" });
    }

    const result = await pool.query(
      `DELETE FROM posts WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully", post: result.rows[0] });
  } catch (err) {
    console.error("Error deleting post:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
