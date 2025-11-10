const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connected to the database.");
  }
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    password TEXT
  )`);

  db.run(`INSERT INTO users (username, password) VALUES ('admin', 'admin123')`);
  db.run(`INSERT INTO users (username, password) VALUES ('user', 'user123')`);

  db.run(`CREATE TABLE IF NOT EXISTS secrets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    secret_key TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS admin_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    admin_user TEXT,
    admin_pass TEXT,
    email TEXT
  )`);

  db.run(
    `INSERT INTO secrets (secret_key) VALUES ('FLAG{SQL_M4ST3R_L3V3L_4}')`
  );
  db.run(`INSERT INTO secrets (secret_key) VALUES ('SECRET_API_KEY_12345')`);

  db.run(
    `INSERT INTO admin_data (admin_user, admin_pass, email) VALUES ('root', 'r00t_p@ssw0rd', 'admin@secure.com')`
  );

  db.run(`CREATE TABLE IF NOT EXISTS pentest_progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id TEXT UNIQUE NOT NULL,
    current_phase INTEGER DEFAULT 0,
    current_step INTEGER DEFAULT 0,
    updated_at TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS pentest_vulnerabilities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id TEXT NOT NULL,
    type TEXT NOT NULL,
    severity TEXT NOT NULL,
    location TEXT NOT NULL,
    found_at TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS pentest_discoveries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id TEXT NOT NULL,
    discovered_data TEXT NOT NULL,
    discovered_at TEXT
  )`);
});

module.exports = db;
