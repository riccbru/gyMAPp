BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS "users" (
    "uid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "admin" INTEGER NOT NULL CHECK ("admin" in (0, 1)) DEFAULT 0,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "birthdate" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "hash" TEXT NOT NULL,   
    "salt" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "bia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uid" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "height" REAL NOT NULL,
    "weight" REAL NOT NULL,
    "bmi" REAL NOT NULL,
    "basal_metabolic_rate" REAL NOT NULL,
    "total_daily_energy_expenditure" REAL NOT NULL,
    "na_k" REAL NOT NULL,
    "phase_angle" REAL NOT NULL,
    "total_body_water" REAL NOT NULL,
    "extra_cellular_water" REAL NOT NULL,
    "intra_cellular_water" REAL NOT NULL,
    "fat_free_mass" REAL NOT NULL,
    "fat_mass" REAL NOT NULL,
    "body_composition_measurement" REAL NOT NULL,
    "muscle_mass" REAL NOT NULL,
    "skeletal_muscle_mass" REAL NOT NULL,
    "appendicular_skeletal_muscle_mass" REAL NOT NULL,


    FOREIGN KEY (uid) REFERENCES users(uid) ON DELETE CASCADE
);

INSERT INTO "bia" (
    "uid", "date", "height", "weight", "bmi",
    "basal_metabolic_rate",
    "total_daily_energy_expenditure",
    "na_k",
    "phase_angle",
    "total_body_water",                     -- tbw% = weight / tbw
    "extra_cellular_water",                 -- ecw% = ecw / tbw
    "intra_cellular_water",                 -- icw% = icw / tbw
    "fat_free_mass",                        -- %ffm = ffm / weight
    "fat_mass",                             -- %fm = fm / weight
    "body_composition_measurement",         -- %bcm = bcm / ffm
    "muscle_mass",                          -- %mm = mm / weight
    "skeletal_muscle_mass",                 -- %smm = smm / weight
    "appendicular_skeletal_muscle_mass"
) VALUES (
    1, "31-08-2024", 177.5, 91.2, 28.9,
    2072.4,
    3523.1,
    0.9,
    7.6,
    55.1,
    21.7,
    33.4,
    75.0,
    16.2,
    45.6,
    55.1,
    40.3,
    31.0
);

COMMIT;