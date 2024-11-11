'use strict';

const db = require("./db");

const returnMeal = (m) => ({
    ingredient:     m.ingredient_name,
    quantity:       m.quantity
});

exports.fetchMeal = (uid, weekday, meal_type) => {
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
                AND m.meal_type = ?;
            ORDER BY
                i.ingredient_id;
        `;
        db.get("SELECT * FROM users WHERE uid = ?", [uid], (err, row) => {
            if (err) { reject(err); }
            else if (!row) { reject(`User with UID #${uid} does not exist`); }
        });
        db.all(sql, [uid, weekday, meal_type], (err, rows) => {
            if (err) { reject(err); }
            else if (!rows.length) { reject(`Meal not found`); }
            else {
                const meal = rows.map((m) => returnMeal(m));
                resolve(meal);
            }
        });
    });
};

exports.fetchMealWithOption = (uid, weekday, meal_type) => {
    return new Promise((resolve, reject) => {
        const sql = ``;
        db.all(sql, [uid, weekday, meal_type], (err, rows) => {
            if (err) { reject(err); }
            else if (!rows.length) { reject(`Meal not found`); }
            else {
                const meal = rows.map((m) => returnMealWithOption(m));
                resolve(meal);
            }
        });
    });
};