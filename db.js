// db.js
const mysql = require("mysql2/promise");
require("dotenv").config();

if (!process.env.MYSQL_URL) {
  throw new Error("MYSQL_URL is not defined in environment variables!");
}

const pool = mysql.createPool(process.env.MYSQL_URL);

async function testConnection() {
  try {
    const conn = await pool.getConnection();
    console.log("✅ Database connected successfully!");
    conn.release();
  } catch (err) {
    console.error("❌ DB connection failed:", err);
  }
}

testConnection();

module.exports = pool;
