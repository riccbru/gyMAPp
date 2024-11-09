"use strict";

const db = require("./db");
const crypto = require("crypto");

exports.signup = (userInfo) => {
  const { name, email, birthdate, username, password } = userInfo;
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
      if (err) reject(err);
      if (row) {
        reject(`Username '${username}' not available`);
      } else {
        crypto.randomBytes(16, (err, buf) => {
          if (err) reject(err);
          const salt = buf.toString("hex");
          crypto.scrypt(password, salt, 64, (err, hash) => {
            if (err) reject(err);
            const sql =
              "INSERT INTO users ('admin', 'name', 'email', 'birthdate', 'username', 'hash', 'salt') VALUES (0, ?, ?, ?, ?, ?, ?)";
            db.run(
              sql,
              [name, email, birthdate, username, hash, salt],
              function (err) {
                if (err) reject(err);
                resolve(`User '${username}' created successfully`);
              }
            );
          });
        });
      }
    });
  });
};

exports.login = (credentials) => {
  const { username, password } = credentials;
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE username = ?";
    db.get(sql, [username], (err, row) => {
      if (err) reject(err);
      if (row === undefined) {
        reject("Invalid username and/or password");
      } else {
        crypto.scrypt(password, row.salt, 64, function (err, hash) {
          const user = {
            uid: row.uid,
            admin: row.admin,
            username: row.username,
            name: row.name,
            birthdate: row.birthdate,
            email: row.email
          };
          if (err) reject(err);
          if (!crypto.timingSafeEqual(Buffer.from(row.hash, "hex"), hash)) {
            reject("Invalid username and/or password");
          } else {
            resolve(user);
          }
        });
      }
    });
  });
};