const express = require('express');
const { Pool } = require('pg');

const app = express();

app.use(express.json());

const pool = new Pool({
  user: 'your-db-user',
  host: 'localhost',
  database: 'your-db-name',
  password: 'your-db-password',
  port: 5432, // default PostgreSQL port
});

// GET request to retrieve all registered students
app.get('/register', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM students');
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching data from the database' });
  }
});

// POST request to register a new student
app.post('/register', async (req, res) => {
  try {
    const { name, exam1, exam2, exam3 } = req.body;

    // Validate exam scores
    if (!Number.isInteger(exam1) || !Number.isInteger(exam2) || !Number.isInteger(exam3)) {
      return res.status(400).json({ message: 'Exam scores must be integers' });
    }

    await pool.query('INSERT INTO students (name, exam1, exam2, exam3) VALUES ($1, $2, $3, $4)', [name, exam1, exam2, exam3]);
    res.status(201).json({ message: 'Student registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while inserting data into the database' });
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
