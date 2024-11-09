"use strict";

const db = require("./db");

const returnPercentage = (num, den) => {
    return Math.round((num / den * 100) * 10) / 10;
}

const returnBia = (b) => {
    const bia = {};

    bia.id = b.id,
    bia.date = b.date,
    bia.height = b.height,
    bia.weight = b.weight,
    bia.basal_metabolic_rate = b.basal_metabolic_rate,
    bia.total_daily_energy_expenditure = b.total_daily_energy_expenditure,
    bia.na_k = b.na_k,
    bia.phase_angle = b.phase_angle,
    bia.total_body_water = b.total_body_water,
    bia.total_body_water_percentage = returnPercentage(bia.total_body_water, bia.weight),
    bia.extra_cellular_water = b.extra_cellular_water,
    bia.extra_cellular_water_percentage = returnPercentage(bia.extra_cellular_water, bia.total_body_water),
    bia.intra_cellular_water = b.intra_cellular_water,
    bia.intra_cellular_water_percentage = returnPercentage(bia.intra_cellular_water, bia.total_body_water),
    bia.fat_free_mass = b.fat_free_mass,
    bia.fat_free_mass_percentage = returnPercentage(bia.fat_free_mass, bia.weight),
    bia.fat_mass = b.fat_mass,
    bia.fat_mass_percentage = returnPercentage(bia.fat_mass, bia.weight),
    bia.body_composition_measurement = b.body_composition_measurement,
    bia.body_composition_measurement_percentage = returnPercentage(bia.body_composition_measurement, bia.fat_free_mass),
    bia.muscle_mass = b.muscle_mass,
    bia.muscle_mass = returnPercentage(bia.muscle_mass, bia.weight),
    bia.skeletal_muscle_mass = b.skeletal_muscle_mass,
    bia.skeletal_muscle_mass_percentage = returnPercentage(bia.skeletal_muscle_mass, bia.weight),
    bia.appendicular_skeletal_muscle_mass = b.appendicular_skeletal_muscle_mass

    return bia;
}

exports.fetchBias = (uid) => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM users WHERE uid = ?", [uid], (err, rows) => {
            if (err) { reject(err); console.log(`daoBias.fetchBias:\n${err}`) }
            else {
                const sql = "SELECT * FROM bias WHERE uid = ? ORDER BY id DESC";
                db.all(sql, [uid], (err, rows) => {
                    if (err) { reject(err); console.log(`daoBias.fetchBias:\n${err}`) }
                    else if (!rows.length) { reject("BIA not found"); }
                    else {
                        const bias = rows.map((b) => returnBia(b));
                        resolve(bias);
                    }
                });
            }
        });
    });
}

exports.pushBia = (bia) => {
    return new Promise((resolve, reject) => {
        let query = "INSERT INTO bias (uid, date, height, weight, bmi, " +
                    "basal_metabolic_rate, total_daily_energy_expenditure, na_k, " +
                    "phase_angle, total_body_water, extra_cellular_water, intra_cellular_water, " + 
                    "fat_free_mass, fat_mass, body_composition_measurement, muscle_mass, " + 
                    "skeletal_muscle_mass, appendicular_skeletal_muscle_mass) " + 
                    "VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )";
        const sql = query;
        db.run(sql,
            [
                bia.uid,
                bia.date,
                bia.height,
                bia.weight,
                bia.bmi,
                bia.basal_metabolic_rate,
                bia.total_daily_energy_expenditure,
                bia.na_k,
                bia.phase_angle,
                bia.total_body_water,
                bia.extra_cellular_water,
                bia.intra_cellular_water,
                bia.fat_free_mass,
                bia.fat_mass,
                bia.body_composition_measurement,
                bia.muscle_mass,
                bia.skeletal_muscle_mass,
                bia.appendicular_skeletal_muscle_mass,
            ],
            function (err) {
                if (err) { reject(err); }
                else { resolve(`BIA #${this.lastID} uploaded`); }
            });
    });
}