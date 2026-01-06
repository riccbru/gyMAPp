'use strict';
const db = require("./db");

const returnLog = (l) => ({
    lid:           l.lid,
    uid:           l.uid,
    exercise_name: l.exercise_name,
    sets:          l.sets,
    reps:          l.reps,
    weight:        l.weight,
    rest:          l.rest,
    date:          l.date
});

// 1. Read: Get logs for a specific user (grouped by date)
exports.fetchLogs = (uid) => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT lid, exercise_name, sets, reps, weight, rest, date
            FROM logs WHERE uid = ?
            ORDER BY date DESC, created_at DESC
        `;
        db.all(sql, [uid], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                const logs = rows.map((l) => returnLog(l));
                resolve(logs);
            }
        });
    });
};

// 2. Create: Log a new home session
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
        const params = [
            uid, 
            log.exercise_name, 
            log.sets, 
            log.reps, 
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

// 3. Delete: In case you make a mistake in the React app
exports.deleteLog = (lid, uid) => {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM logs WHERE lid = ? AND uid = ?`;
        db.run(sql, [lid, uid], function (err) {
            if (err) { reject(err); }
            else { resolve({"success": `Log ${lid} successfully deleted`}); }
        });
    });
};