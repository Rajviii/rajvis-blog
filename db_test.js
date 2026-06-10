const { Pool } = require('pg');
require('dotenv').config({ path: '.env' });

async function test() {
  console.log("Connecting to:", process.env.DATABASE_URL);
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  try {
    const res = await pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
    console.log("Tables in public schema:");
    res.rows.forEach(r => console.log("-", r.table_name));
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
}

test();
