// createDatabase.js
import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  password: 'gres',
  port: 4000,
  database: 'postgres' // connect to default db to create a new one
});

const createDatabase = async () => {
  try {
    await client.connect();
    await client.query('CREATE DATABASE NSNRW_db');
    console.log('✅ Database "NSNRW_db" created!');
  } catch (err) {
    console.error('❌ Error creating database:', err);
  } finally {
    await client.end();
  }
};

createDatabase();
