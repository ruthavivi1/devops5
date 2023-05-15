const { Pool } = require('pg');

const pool = new Pool({
  user: 'ruth',
  host: 'localhost',
  database: 'students',
  password: '08976453',
  port: 5432, // default PostgreSQL port
});

module.exports = pool;