"use strict";

const db = require("./db");
const crypto = require("crypto");

exports.signup = async (userInfo) => {
  const { name, email, birthdate, username, password } = userInfo;

  try {
    /* CHECK IF USER ALREADY EXISTS */
    const user = await new Promise((resolve, reject) => {
      const sql = "SELECT * FROM users WHERE username = ?";
      db.get(sql, [username], (err, row) => {
        if (err) { reject(err); }
        else { resolve(row); }
      });
    });

    if (user) {
      throw new Error(`Username '${username}' not available`);
    }

    else {

      /* SALT GENERATION */
      const salt = await new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) { reject(err); }
          else { resolve(buf.toString("hex")); }
        });
      });

      /* HASH GENERATION */
      const hash = await new Promise((resolve, reject) => {
        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
          if (err) { reject(err); }
          else { resolve(derivedKey.toString("hex")); }
        });
      });

      /* INSERT QUERY */
      await new Promise((resolve, reject) => {
        const sql = "INSERT INTO users ('admin', 'name', 'email', 'birthdate', 'username', 'hash', 'salt') VALUES (0, ?, ?, ?, ?, ?, ?)";
        db.run(sql, [name, email, birthdate, username, hash, salt], function (err) {
          if (err) { reject(err); }
          else { resolve(`User '${username}' created successfully`); }
        });
      });
      return `User '${username}' created successfully`;
    }
  } catch(err) {
      throw new Error(err.message || "Signup failed");
  }
};

exports.login = (credentials) => {
  const { username, password } = credentials;
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE username = ?";
    db.get(sql, [username], (err, row) => {

      if (err) { reject(err); }
      else if (!row) {
        reject("Invalid username and/or password");
      } else {
        crypto.scrypt(password, row.salt, 64, (err, hash) => {
          if (err) reject(err);
          if (!crypto.timingSafeEqual(Buffer.from(row.hash, "hex"), hash)) {
            reject("Invalid username and/or password");
          } else {
            const user = (({ uid, admin, name, email, birthdate, username }) => ({ uid, admin, name, email, birthdate, username }))(row);
            resolve(user);
          }
        });
      }

    });
  });
};