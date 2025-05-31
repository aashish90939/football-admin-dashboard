import pool from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('Missing JWT_SECRET in environment');
}

// ✅ Updated: Include membership_type in token
const generateToken = (user) =>
  jwt.sign(
    {
      id: user.id,
      role: user.role,
      membership_type: user.membership_type,
    },
    JWT_SECRET,
    { expiresIn: '1d' }
  );

// POST /api/auth/register
export const registerUser = async (req, res) => {
  const { name, email, password, membership_type, motivation } = req.body;

  if (!name || !email || !password || !membership_type) {
    return res.status(400).json({ error: 'All required fields must be filled.' });
  }

  try {
    const { rows: existingUsers } = await pool.query(
      `SELECT id FROM users WHERE email = $1`,
      [email]
    );
    if (existingUsers.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const { rows } = await pool.query(
      `INSERT INTO users (name, email, password_hash, role, membership_type, status, motivation)
       VALUES ($1, $2, $3, 'member', $4, 'pending', $5)
       RETURNING id, name, email, role, membership_type, status, motivation`,
      [name, email, hashedPassword, membership_type, motivation]
    );

    res.status(201).json({ message: 'User registered', user: rows[0] });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// POST /api/auth/login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { rows } = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = rows[0];

    // ❌ Reject users who are not yet accepted
    if (user.status !== 'accepted') {
      return res.status(403).json({
        error: 'Your membership is still pending or was declined. Please wait for approval.',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // ✅ Generate token with membership_type
    const token = generateToken(user);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        membership_type: user.membership_type,
        status: user.status,
        motivation: user.motivation,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// GET /api/users
export const getUsers = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, name, email, role, membership_type, status FROM users`
    );
    res.json(rows);
  } catch (err) {
    console.error('Fetch users error:', err);
    res.status(500).json({ error: 'Could not fetch users' });
  }
};

// GET /api/users/accepted
export const getAcceptedUsers = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, name, email, role, membership_type, status FROM users WHERE status = 'accepted'`
    );
    res.json(rows);
  } catch (err) {
    console.error('Fetch accepted users error:', err);
    res.status(500).json({ error: 'Could not fetch accepted users' });
  }
};

// GET /api/users/pending
export const getPendingUsers = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, name, email, role, membership_type, status FROM users WHERE status = 'pending'`
    );
    res.json(rows);
  } catch (err) {
    console.error('Fetch pending users error:', err);
    res.status(500).json({ error: 'Could not fetch pending users' });
  }
};

// PATCH /api/users/:id/status
export const updateUserStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['accepted', 'declined'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }

  try {
    const { rowCount } = await pool.query(
      `UPDATE users SET status = $1 WHERE id = $2`,
      [status, id]
    );

    if (rowCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: `User status updated to '${status}'` });
  } catch (err) {
    console.error('Update user status error:', err);
    res.status(500).json({ error: 'Could not update user status' });
  }
};


// DELETE /api/users/:id
export const deleteUserById = async (req, res) => {
  const { id } = req.params;

  try {
    // First delete any linked player profile
    await pool.query(`DELETE FROM player_profiles WHERE user_id = $1`, [id]);

    // Then delete the user
    const { rowCount } = await pool.query(`DELETE FROM users WHERE id = $1`, [id]);

    if (rowCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User and associated profile deleted' });
  } catch (err) {
    console.error('Delete user error:', err);
    res.status(500).json({ error: 'Could not delete user' });
  }
};
