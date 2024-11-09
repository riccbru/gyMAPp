'use strict';

const db = require('./db');

const getMeal = (uid, weekday, meal_type) => {
    return new Promise((resolve, reject) => {
        const sql = `
        SELECT
            m.id AS meal_id,
            m.weekday,
            m.meal_type,
            i.ingredient_name,
            iu.quantity
        FROM
            meals m
        JOIN
            ingredients_usage iu ON m.id = iu.meal_id
        JOIN
            ingredients i ON iu.ingredient_id = i.id
        WHERE
            m.uid = ?
            AND m.weekday = ?
            AND m.meal_type = ?
        ORDER BY
            iu.ingredients_id;
        `;
        db.all(sql, [uid, weekday, meal_type], (err, rows) => {
            if (err) { reject(err); }
            else if (!rows.length) {
                reject("Diet planning not inserted yet");
            } else {
                rows.map((m) => { console.log(m); })
            }
        });
    });
}

const uid = 1;
const weekday = 1;
const meal_type = 1;

try {
    const result = await getMeal(uid, weekday, meal_type);
    console.log(result);
} catch (err) {
    console.log(`ERROR:\n${err}`)
}


