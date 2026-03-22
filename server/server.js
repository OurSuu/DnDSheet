import express from 'express';
import cors from 'cors';
import pool, { initDb } from './db.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize the Database (create tables if they don't exist)
initDb();

// GET /api/data - Fetch all parties and their members
app.get('/api/data', async (req, res) => {
  try {
    const partiesResult = await pool.query('SELECT * FROM parties ORDER BY name ASC');
    const membersResult = await pool.query('SELECT * FROM members ORDER BY name ASC');
    
    res.status(200).json({
      success: true,
      parties: partiesResult.rows,
      members: membersResult.rows
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error while fetching data.' });
  }
});

// POST /api/party/create
app.post('/api/party/create', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Party name is required.' });

    const query = 'INSERT INTO parties (name) VALUES ($1) RETURNING *';
    const result = await pool.query(query, [name.trim()]);
    res.status(200).json({ success: true, party: result.rows[0] });
  } catch (error) {
    if (error.code === '23505') { // unique violation
      return res.status(400).json({ error: 'Party name already exists.' });
    }
    console.error('Error creating party:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// POST /api/party/delete
app.post('/api/party/delete', async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: 'Party ID is required.' });

    await pool.query('DELETE FROM parties WHERE id = $1', [id]);
    res.status(200).json({ success: true, message: 'Party deleted successfully' });
  } catch (error) {
    console.error('Error deleting party:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// POST /api/member/create
app.post('/api/member/create', async (req, res) => {
  try {
    const { name, party_id } = req.body;
    if (!name || !party_id) return res.status(400).json({ error: 'Name and party_id are required.' });

    const query = 'INSERT INTO members (name, party_id) VALUES ($1, $2) RETURNING *';
    const result = await pool.query(query, [name.trim(), party_id]);
    
    // Create an empty sheet for the member right away
    const emptySheet = {
      name: name.trim(),
      party: "", 
      relationships: Array(5).fill({ name: "", points: 0, relationship: "", inspiration: false, boonBane: "" }),
      reportCards: {
        year1: Array(3).fill({ checks: [false, false, false, false], skills: "" }),
        year2: Array(3).fill({ checks: [false, false, false, false], skills: "" }),
        year3: Array(3).fill({ checks: [false, false, false, false], skills: "" }),
        year4: Array(1).fill({ checks: [false, false, false, false], skills: "" }),
      },
      extracurriculars: [
        { name: "", d4: false, skills: "", member: false },
        { name: "", d4: false, skills: "", member: false }
      ],
      job: { employer: "", job: "", coworker: "" }
    };
    
    await pool.query('INSERT INTO sheets (member_id, data) VALUES ($1, $2)', [result.rows[0].id, emptySheet]);

    res.status(200).json({ success: true, member: result.rows[0], sheet: emptySheet });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({ error: 'Member name already exists in this party.' });
    }
    console.error('Error creating member:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// POST /api/member/update
app.post('/api/member/update', async (req, res) => {
  try {
    const { id, name } = req.body;
    if (!id || !name) return res.status(400).json({ error: 'Member ID and name are required.' });

    const query = 'UPDATE members SET name = $1 WHERE id = $2 RETURNING *';
    const result = await pool.query(query, [name.trim(), id]);
    res.status(200).json({ success: true, member: result.rows[0] });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({ error: 'Member name already exists in this party.' });
    }
    console.error('Error updating member:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// POST /api/member/delete
app.post('/api/member/delete', async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: 'Member ID is required.' });

    await pool.query('DELETE FROM members WHERE id = $1', [id]);
    res.status(200).json({ success: true, message: 'Member deleted successfully' });
  } catch (error) {
    console.error('Error deleting member:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// POST /api/save - Save or update a character sheet
app.post('/api/save', async (req, res) => {
  try {
    const { member_id, data } = req.body;
    
    if (!member_id || !data) {
      return res.status(400).json({ error: 'member_id and data are required.' });
    }

    const query = `
      INSERT INTO sheets (member_id, data)
      VALUES ($1, $2)
      ON CONFLICT (member_id)
      DO UPDATE SET 
        data = EXCLUDED.data,
        updated_at = NOW()
      RETURNING id, member_id, updated_at;
    `;
    const values = [member_id, data];
    
    const result = await pool.query(query, values);
    
    console.log(`Saved sheet for member ${member_id}`);
    res.status(200).json({ success: true, message: 'Sheet saved successfully', record: result.rows[0] });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Internal server error while saving.' });
  }
});

// POST /api/load - Load a character sheet
app.post('/api/load', async (req, res) => {
  try {
    const { member_id } = req.body;
    
    if (!member_id) {
      return res.status(400).json({ error: 'member_id is required to load a sheet.' });
    }

    const query = 'SELECT data, updated_at FROM sheets WHERE member_id = $1;';
    const result = await pool.query(query, [member_id]);
    
    if (result.rows.length > 0) {
      console.log(`Loaded sheet for member ${member_id}`);
      res.status(200).json({ success: true, data: result.rows[0].data, updated_at: result.rows[0].updated_at });
    } else {
      console.log(`No existing sheet found for member ${member_id}`);
      res.status(404).json({ success: false, error: 'Sheet not found.' });
    }
  } catch (error) {
    console.error('Error loading data:', error);
    res.status(500).json({ error: 'Internal server error while loading.' });
  }
});

// Start the server locally if not in Vercel production
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

// Export for Vercel
export default app;
