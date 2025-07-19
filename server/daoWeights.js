"use strict";

const db = require("./db");
const dayjs = require("dayjs");

const returnWeight = (w) => ({
    weid:   w.weid,
    date:   w.date,
    weight: w.weight ?? w.muscle_mass ?? w.fat_mass ?? null
});

exports.fetchWeights = (uid, mass) => {
    return new Promise((resolve, reject) => {
        const sqlQueries = {
            tot: "SELECT * FROM weights WHERE uid = ?",
            fat: "SELECT date, fat_mass FROM bias WHERE uid = ?",
            muscle: "SELECT date, muscle_mass FROM bias WHERE uid = ?",
        }
        const sqlQuery = sqlQueries[mass];
        if (!sqlQuery) { reject(`Invalid weight type '${type}'`); }
        db.get("SELECT * FROM users WHERE uid = ?", [uid], (err, row) => {
            if (err) { reject(err); }
            else if (!row) { reject(`User with UID #${uid} does not exist`); }
        });
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