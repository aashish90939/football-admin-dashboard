// src/models/setupDb.js
import pool from '../config/db.js';

console.log('Connecting to DB:', process.env.DATABASE_URL);

const createTables = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        password_hash TEXT NOT NULL,
        role VARCHAR(20) CHECK (role IN ('admin', 'member', 'player', 'honorary')) NOT NULL,
        membership_type VARCHAR(20) CHECK (membership_type IN ('player', 'general', 'honorary')),
        status VARCHAR(20) CHECK (status IN ('pending', 'accepted', 'declined')),
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS player_profiles (
        id SERIAL PRIMARY KEY,
        user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
        jersey_number INTEGER,
        position VARCHAR(50),
        photo_url TEXT
      );

      CREATE TABLE IF NOT EXISTS matches (
        id SERIAL PRIMARY KEY,
        opponent_name VARCHAR(100),
        date TIMESTAMP,
        location VARCHAR(100),
        score_our_team INTEGER,
        score_opponent INTEGER
      );

      CREATE TABLE IF NOT EXISTS trainings (
        id SERIAL PRIMARY KEY,
        date TIMESTAMP,
        focus TEXT,
        notes TEXT
      );

      CREATE TABLE IF NOT EXISTS attendance (
        id SERIAL PRIMARY KEY,
        training_id INTEGER REFERENCES trainings(id) ON DELETE CASCADE,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        status VARCHAR(20) CHECK (status IN ('present', 'absent')) NOT NULL
      );
    `);

    console.log('✅ Tables created successfully in NSNRW_db!');
  } catch (error) {
    console.error('❌ Error creating tables:', error);
  } finally {
    await pool.end();
  }
};

createTables();
