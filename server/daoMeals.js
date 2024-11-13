'use strict';

const db = require("./db");

const returnMeal = (m) => ({
    ingredient:     m.ingredient_name,
    quantity:       m.quantity
});

const returnMealWithOptions = (uid, weekday, meal_type, rows) => {
    const meals = {
        uid: uid,
        meal: parseInt(meal_type, 10),
        weekday: parseInt(weekday, 10),
        options: {}
    };
    rows.forEach(row => {
        const { option_id, ingredient_name, quantity } = row;
        const key = option_id;
        if (!meals.options[key]) {
            meals.options[key] = [];
        }
        meals.options[key].push({
            ingredient: ingredient_name,
            quantity: quantity
        });   
    });
    return meals;
};

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

exports.fetchMealWithOptions = (uid, weekday, meal_type) => {
    return new Promise((resolve, reject) => {
        const sql = `
        SELECT 
            m.id AS meal_id,
            m.weekday,
            m.meal_type,
            iu.option_id,
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
            iu.option_id, i.ingredient_name;
        `;
        db.all(sql, [uid, weekday, meal_type], (err, rows) => {
            if (err) { reject(err); }
            else if (!rows.length) { reject(`Meal not found`); }
            else {
                const meal = returnMealWithOptions(uid, weekday, meal_type, rows);
                resolve(meal);
            }
        });
    });
};