import pool from '../config/db.js';

// Create a player profile (store image directly in BYTEA column)
export const createPlayerProfile = async (req, res) => {
  try {
    const user_id = req.user.id;

    // Expecting 'player' role in token
    if (req.user.membership_type !== 'player') {
      return res.status(403).json({ error: 'Only players can create profiles' });
    }

    const { jersey_number, position, sub_role } = req.body;

    if (!jersey_number || !position) {
      return res.status(400).json({ error: 'Jersey number and position are required' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'Photo is required' });
    }

    const photo = req.file.buffer;

    const { rows } = await pool.query(
      `INSERT INTO player_profiles (user_id, jersey_number, position, sub_role, photo)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [user_id, jersey_number, position, sub_role || null, photo]
    );

    res.status(201).json({ profile: rows[0] });
  } catch (err) {
    console.error('Create profile error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get profile by user ID
export const getPlayerProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const { rows } = await pool.query(
      `SELECT id, user_id, jersey_number, position, sub_role FROM player_profiles WHERE user_id = $1`,
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error('Fetch profile error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get profile photo separately (Base64)
export const getProfilePhoto = async (req, res) => {
  try {
    const { userId } = req.params;
    const { rows } = await pool.query(
      `SELECT photo FROM player_profiles WHERE user_id = $1`,
      [userId]
    );

    const photoBuffer = rows[0]?.photo;

    if (!photoBuffer) {
      return res.status(404).send('Image not found');
    }

    const base64Image = Buffer.from(photoBuffer).toString('base64');
    res.send(`data:image/jpeg;base64,${base64Image}`);
  } catch (err) {
    console.error('Get profile photo error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update profile
export const updatePlayerProfile = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { jersey_number, position, sub_role } = req.body;

    const fields = [];
    const values = [];
    let idx = 1;

    if (jersey_number) {
      fields.push(`jersey_number = $${idx++}`);
      values.push(jersey_number);
    }
    if (position) {
      fields.push(`position = $${idx++}`);
      values.push(position);
    }
    if (sub_role !== undefined) {
      fields.push(`sub_role = $${idx++}`);
      values.push(sub_role);
    }
    if (req.file) {
      fields.push(`photo = $${idx++}`);
      values.push(req.file.buffer);
    }

    if (fields.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    values.push(user_id); // for WHERE clause

    const query = `
      UPDATE player_profiles
      SET ${fields.join(', ')}
      WHERE user_id = $${values.length}
      RETURNING *`;

    const { rows } = await pool.query(query, values);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json({ profile: rows[0] });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete profile
export const deletePlayerProfile = async (req, res) => {
  try {
    const user_id = req.user.id;

    const { rowCount } = await pool.query(
      `DELETE FROM player_profiles WHERE user_id = $1`,
      [user_id]
    );

    if (rowCount === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json({ message: 'Profile deleted successfully' });
  } catch (err) {
    console.error('Delete profile error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// GET /api/users/:id/full-profile
export const getFullUserProfiles = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT 
         u.id AS user_id, u.name, u.email, u.membership_type, u.role, u.status,
         p.jersey_number, p.position, p.sub_role,
         encode(p.photo, 'base64') AS photo_base64
       FROM users u
       LEFT JOIN player_profiles p ON u.id = p.user_id
       ORDER BY u.name ASC`
    );

    res.json(rows);
  } catch (err) {
    console.error('Fetch full profiles error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
