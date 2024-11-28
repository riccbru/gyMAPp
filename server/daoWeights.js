"use strict";

const db = require("./db");
const dayjs = require("dayjs");

const returnWeight = (w) => ({
    weid:   w.weid,
    date:   w.date,
    weight: w.weight
});

exports.fetchWeights = (uid) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM users WHERE uid = ?", [uid], (err, row) => {
            if (err) { reject(err); }
            else if (!row) { reject(`User with UID #${uid} does not exist`); }
        });
        const sql = `SELECT * FROM weights WHERE uid = ?`;
        db.all(sql, [uid], (err, rows) => {
            if (err) {
                reject(err);
            } else if (!rows.length) {
                reject(`No weights tracked yet`);
            } else {
              const weights = rows.map((w) => returnWeight(w));
              resolve(weights);
            }
        });
    });
}

exports.pushWeight = (uid, weight) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM users WHERE uid = ?", [uid], (err, row) => {
            if (err) { reject(err); }
            else if (!row) { reject(`User with UID #${uid} does not exist`); }
        });
        const sql = `INSERT INTO weights ( uid, date, weight)
                        VALUES ( ?, ?, ? )`;
        const date = dayjs().format("MM-DD-YYYY");
        db.run(sql, [uid, date, weight],
            function (err) {
                if (err) { reject(err); console.log(err); }
                else { resolve(`Uploaded new weight`); } 
            }
        )
    })
}