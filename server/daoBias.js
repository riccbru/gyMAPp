"use strict";

const db = require("./db");

const returnPercentage = (num, den) => {
    return Math.round((num / den * 100) * 10) / 10;
}

const returnBia = (b) => ({
    id:                                         b.id,
    date:                                       b.date,
    height:                                     b.height,
    weight:                                     b.weight,
    bmi:                                        b.bmi,
    basal_metabolic_rate:                       b.basal_metabolic_rate,
    total_daily_energy_expenditure:             b.total_daily_energy_expenditure,
    na_k:                                       b.na_k,
    phase_angle:                                b.phase_angle,
    total_body_water:                           b.total_body_water,
    total_body_water_percentage:                returnPercentage(b.total_body_water, b.weight),
    extra_cellular_water:                       b.extra_cellular_water,
    extra_cellular_water_percentage:            returnPercentage(b.extra_cellular_water, b.total_body_water),
    intra_cellular_water:                       b.intra_cellular_water,
    intra_cellular_water_percentage:            returnPercentage(b.intra_cellular_water, b.total_body_water),
    fat_free_mass:                              b.fat_free_mass,
    fat_free_mass_percentage:                   returnPercentage(b.fat_free_mass, b.weight),
    fat_mass:                                   b.fat_mass,
    fat_mass_percentage:                        returnPercentage(b.fat_mass, b.weight),
    body_composition_measurement:               b.body_composition_measurement,
    body_composition_measurement_percentage:    returnPercentage(b.body_composition_measurement, b.fat_free_mass),
    muscle_mass:                                b.muscle_mass,
    muscle_mass_percentage:                     returnPercentage(b.muscle_mass, b.weight),
    skeletal_muscle_mass:                       b.skeletal_muscle_mass,
    skeletal_muscle_mass_percentage:            returnPercentage(b.skeletal_muscle_mass, b.weight),
    appendicular_skeletal_muscle_mass:          b.appendicular_skeletal_muscle_mass
})

exports.fetchBias = (uid) => {
    return new Promise((resolve, reject) => {
        const sql = `
        SELECT bias.*, users.username
        FROM users
        LEFT JOIN bias ON users.uid = bias.uid
        WHERE users.uid = ?
        ORDER BY bias.bid DESC;
        `;
        db.get("SELECT * FROM users WHERE uid = ?", [uid], (err, row) => {
            if (err) { reject(err); }
            else if (!row) { reject(`User with UID #${uid} does not exist`); }
        });
        db.all(sql, [uid], (err, rows) => {
            if (err) {
                reject(err);
            } else if (!(rows.length || rows.some(row => row.id))) {
                reject(`No BIAs for user ${rows[0]?.username}`);
            } else {
              const bias = rows.map((b) => returnBia(b));
              resolve(bias);
            }
        });
    });
}

exports.pushBia = (bia) => {
    return new Promise((resolve, reject) => {
        const sql = `
        INSERT INTO bias (
            uid, date, height, weight, bmi, 
            basal_metabolic_rate, total_daily_energy_expenditure, na_k, 
            phase_angle, total_body_water, extra_cellular_water, intra_cellular_water, 
            fat_free_mass, fat_mass, body_composition_measurement, muscle_mass, 
            skeletal_muscle_mass, appendicular_skeletal_muscle_mass
            ) 
        VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? );
        `;
        const biaArray = [
            bia.uid, bia.date, bia.height, bia.weight, bia.bmi,
            bia.basal_metabolic_rate, bia.total_daily_energy_expenditure, bia.na_k, bia.phase_angle,
            bia.total_body_water, bia.extra_cellular_water, bia.intra_cellular_water,
            bia.fat_free_mass, bia.fat_mass, bia.body_composition_measurement, bia.muscle_mass,
            bia.skeletal_muscle_mass, bia.appendicular_skeletal_muscle_mass,
        ]
        db.run(sql, biaArray,
            function (err) {
                if (err) { reject(err); console.log(err); }
                else { resolve(`Uploaded new BIA with ID #${this.lastID}`); }
            });
    });
}