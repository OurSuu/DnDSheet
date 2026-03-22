import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();

// Create a connection pool using the Neon Database URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true,
  },
});

export const initDb = async () => {
  try {
    // Ensure the parties table exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS parties (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT UNIQUE NOT NULL
      );
    `);

    // Ensure the members table exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS members (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        party_id UUID REFERENCES parties(id) ON DELETE CASCADE,
        UNIQUE(name, party_id)
      );
    `);

    // Ensure the sheets table exists (restructured for member_id)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS sheets (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        member_id UUID UNIQUE REFERENCES members(id) ON DELETE CASCADE,
        data JSONB NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('Database initialized successfully.');
  } catch (err) {
    console.error('Error initializing database:', err);
  }
};

export default pool;
