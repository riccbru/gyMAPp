'use strict';
const db = require("./db");

const returnLog = (l) => ({
    lid:           l.lid,
    uid:           l.uid,
    exercise_name: l.exercise_name,
    sets:          l.sets,
    reps:          l.reps ? l.reps.split(',').map(n => parseInt(n, 10)) : [],
    weight:        l.weight,
    rest:          l.rest,
    date:          l.date
});

exports.fetchLogs = (uid) => {
    return new Promise((resolve, reject) => {
        const sql = `
        SELECT * FROM logs
        WHERE uid = ? ORDER BY date DESC
        `;
        db.all(sql, [uid], (err, rows) => {
            if (err) { reject(err); }
            else {
                const logs = rows.map((l) => returnLog(l));
                resolve(logs);
            }
        });
    });
};

exports.pushLog = (uid, log) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM users WHERE uid = ?", [uid], (err, row) => {
            if (err) { reject(err); }
            else if (!row) { reject(`User with UID #${uid} does not exist`); }
        });
        const sql = `
        INSERT INTO logs (uid, exercise_name, sets, reps, weight, rest, date)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const repsString = Array.isArray(log.reps) ? log.reps.join(',') : log.reps;
        const params = [
            uid,
            log.exercise_name,
            log.sets,
            repsString,
            log.weight || 0,
            log.rest,
            log.date || null
        ];

        db.run(sql, params,
            function (err) {
                if (err) { reject(err); console.log(err); }
                else { resolve(`Uploaded new log`); } 
            }
        );
    });
};

exports.deleteLog = (lid, uid) => {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM logs WHERE lid = ? AND uid = ?`;
        db.run(sql, [lid, uid], function (err) {
            if (err) { reject(err); }
            else { resolve({"success": `Log ${lid} successfully deleted`}); }
        });
    });
};