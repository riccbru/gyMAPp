'use strict';

const db = require("./db");

const returnWorkout = (r) => ({
    name: r.name,
    sets: r.sets,
    reps: r.reps,
    weight: r.weight,
    rest: r.rest
});

exports.fetchWorkout = (uid, weekday) => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT
                (SELECT COUNT(*) 
                FROM exercises AS e 
                WHERE e.wid = exercises.wid 
                AND e.eid <= exercises.eid) AS enum,
                exercises.name, 
                exercises.sets, 
                exercises.reps, 
                exercises.weight,
                exercises.rest
            FROM exercises
            INNER JOIN workouts ON exercises.wid = workouts.wid
            WHERE workouts.uid = ? AND workouts.weekday = ?;
        `;
        db.all(sql, [uid, weekday], (err, rows) => {
            if (err) { reject(err); }
            else if (!rows.length) { reject("No workout"); }
            else {
                const workout = rows.map(r => returnWorkout(r));
                resolve(workout);
            }
        });
    });
};