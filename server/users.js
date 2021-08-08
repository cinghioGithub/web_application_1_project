"use strict";
const sqlite = require("sqlite3");
const bcrypt = require("bcrypt");
const db = new sqlite.Database("exam.db", (err) => {
  if (err) throw err;
});

/* get user by username and password */
exports.getUser = (username, password) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE username=?";
    db.get(sql, [username], (err, row) => {
      if (err) {
        reject(err);
      } else {
        if (row) {
          const user = { id: row.id, username: row.username, name: row.name };
          bcrypt.compare(password, row.hash).then((result) => {
            if (result) resolve(user);
            else resolve(false);
          });
        } else {
          resolve(false);
        }
      }
    });
  });
};

/* get user by id to check the session */
exports.getUserById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE id=?";
    db.get(sql, [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        if (row) {
          const user = { id: row.id, username: row.username, name: row.name };
          resolve(user);
        } else {
          resolve({ error: "user not found!" });
        }
      }
    });
  });
};
