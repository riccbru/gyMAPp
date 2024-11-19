'use strict';

const db = require("./db");

const returnMeal = (rows) => {
    const options = [];
    rows.forEach(row => {
        const { option_id, ingredient_name, quantity } = row;
        if (!options[option_id]) {
            options[option_id] = [];
        }
        options[option_id].push({
            ingredient: ingredient_name,
            quantity: quantity,
        });
    });
    return options.filter(option => option);
};

exports.fetchMeal = (uid, weekday, meal_type) => {
    return new Promise((resolve, reject) => {
        const sql = `
        SELECT 
            m.mid AS meal_id,
            m.weekday,
            m.meal_type,
            iu.option_id,
            i.ingredient_name,
            iu.quantity
        FROM 
            meals m
        JOIN 
            ingredients_usage iu ON m.mid = iu.meal_id
        JOIN 
            ingredients i ON iu.ingredient_id = i.iid
        WHERE 
            m.uid = ?
            AND m.weekday = ?
            AND m.meal_type = ?
        ORDER BY 
            m.mid;
        `;
        db.all(sql, [uid, weekday, meal_type], (err, rows) => {
            if (err) { reject(err); }
            else if (!rows.length) { reject(`No meal`); }
            else {
                const meal = returnMeal(rows);
                resolve(meal);
            }
        });
    });
};