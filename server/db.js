import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const db = mysql.createConnection({
  host: process.env.host,
  user: process.env.user, // your MySQL username
  password: process.env.password, // your MySQL password
  database: process.env.database, // create this db in MySQL
});

console.log(
  "ENV:",
  process.env.host,
  process.env.user,
  process.env.password,
  process.env.database
);

db.connect((err) => {
  if (err) {
    console.error("❌ DB Connection Failed:", err);
    return;
  }
  console.log("✅ MySQL Connected...");
});

export default db;
