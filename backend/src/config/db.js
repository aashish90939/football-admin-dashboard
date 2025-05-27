import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Create a new PostgreSQL connection pool
// using the connection string from environment variables
//const pool = new Pool({  
  //connectionString: process.env.DATABASE_URL,
//});

// Test the connection to the database
pool.connect()
  .then(() => console.log('Connected to PostgreSQL ✅'))
  .catch((err) => console.error('Database connection error ❌', err));

export default pool;

