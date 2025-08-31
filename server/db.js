import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPromise = open({
  filename: path.join(__dirname, "customer.db"),
  driver: sqlite3.Database,
});

// Initialize tables
(async () => {
  try {
    const db = await dbPromise;
    await db.run(`
      CREATE TABLE IF NOT EXISTS customers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT,
        lastName TEXT,
        phone TEXT,
        email TEXT UNIQUE,
        address TEXT,
        city TEXT,
        state TEXT,
        pincode TEXT
      )
    `);

    await db.run(`
      CREATE TABLE IF NOT EXISTS addresses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customerId INTEGER,
        address TEXT,
        city TEXT,
        state TEXT,
        country TEXT,
        postalCode TEXT,
        FOREIGN KEY (customerId) REFERENCES customers(id) ON DELETE CASCADE
      )
    `);

    console.log("✅ SQLite database initialized");
  } catch (err) {
    console.error("❌ Error initializing database:", err);
  }
})();

export default dbPromise;
