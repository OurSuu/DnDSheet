import pool from './db.js';

export const migrateDb = async () => {
  try {
    console.log('Dropping old sheets table...');
    await pool.query('DROP TABLE IF EXISTS sheets CASCADE;');
    console.log('Old sheets table dropped.');

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

    // Recreate sheets table with correct schema
    await pool.query(`
      CREATE TABLE IF NOT EXISTS sheets (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        member_id UUID UNIQUE REFERENCES members(id) ON DELETE CASCADE,
        data JSONB NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('Successfully applied new schema for sheets.');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
};

migrateDb();
