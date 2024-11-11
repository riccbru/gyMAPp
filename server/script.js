'use strict';

const db = require("./db");

const returnMeal = (m) => ({
    ingredient:     m.ingredient_name,
    quantity:       m.quantity
});


const getMeal = async (uid, weekday, meal_type) => {
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
            `;
        db.all(sql, [uid, weekday, meal_type], (err, rows) => {
            if (err) { reject(err); }
            else if (!rows.length) {
                reject("Meal not found");
            } else {
                const meals = rows.map((m) => { returnMeal(m); });
                resolve(meals);
            }
        });
    });
}

const fetchMeal = async () => {

    const uid = 1;
    const weekday = 1;
    const meal_type = 1;

    try {
        const result = await getMeal(uid, weekday, meal_type);
        console.log(result);
    } catch (err) {
        console.log(`ERROR:\n${err}`)
    }
}

fetchMeal();

