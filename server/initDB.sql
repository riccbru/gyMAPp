BEGIN TRANSACTION;

-- ***************** --
-- * CREATE TABLES * --
-- ***************** --

CREATE TABLE IF NOT EXISTS "users" (
    "uid" INTEGER PRIMARY KEY AUTOINCREMENT,
    "admin" INTEGER NOT NULL CHECK ("admin" in (0, 1)) DEFAULT 0,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "birthdate" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "hash" TEXT NOT NULL,   
    "salt" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "bias" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
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

CREATE TABLE IF NOT EXISTS "meals" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "uid" INTEGER NOT NULL,
    "weekday" INTEGER NOT NULL CHECK ("weekday" BETWEEN 1 AND 7), 
    "meal_type" INTEGER NOT NULL CHECK ("meal_type" BETWEEN 1 AND 7),

    FOREIGN KEY (uid) REFERENCES users(uid) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "ingredients" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "ingredient_name" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "ingredients_usage" (
    "meal_id" INTEGER NOT NULL,
    "ingredient_id" INTEGER NOT NULL,
    "quantity" REAL NOT NULL,

    PRIMARY KEY (meal_id, ingredient_id),
    FOREIGN KEY (meal_id) REFERENCES meals(id) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "meals_options" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "meal_id" INTEGER NOT NULL,
  "option_number" INTEGER NOT NULL,

  FOREIGN KEY (meal_id) REFERENCES meals(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "meals_options_ingredients" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "meal_option_id" INTEGER NOT NULL,
    "ingredient_id" INTEGER NOT NULL,

    FOREIGN KEY (meal_option_id) REFERENCES meals_options(id) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(id) ON DELETE CASCADE
);

-- *************************** --
-- * INSERT DATA INTO TABLES * --
-- *************************** --

INSERT INTO "users" (
    "admin", "name", "email", "birthdate", "username", "hash", "salt"
) VALUES (
    1, "Riccardo Bruno", "riccardo.bruno@gymapp.dev", "11-25-1999", "bankich",
    "e982818124aab7af645a118a321edcc5af4798548a2f4819a192f21f173be85c9123d3911903f602c5d787f6074cdbf0d42114bcc5843ea2cbe9b3163b6508b8",
    "c631ac0affd7db484f8d0103e706d3c8"
);

INSERT INTO "users" (
    "admin", "name", "email", "birthdate", "username", "hash", "salt"
) VALUES (
    0, "Ciclarimpo", "ciclarimpo@gymapp.dev", "01-01-0001", "ciclarimpo",
    "e94959bd74a547cb72cca16f55c319547a95fb481d5cc2e436759e08a61453d0180d96961791a1eb7a45c24a56d9cd791a3074e6db6da998ebcdd16b19fd33c1",
    "38d0246251f259a305c5af38b17d026b"
);

INSERT INTO "bias" (
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
    1, "08-31-2024", 177.5, 91.2, 28.9,
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

-- *************************** --
-- * DIET PLANNING INSERTION * --
-- *************************** --

-- ************* --
-- * BREAKFAST * --
-- ************* --
INSERT INTO "meals" ("uid", "weekday", "meal_type")
VALUES (1, 1, 1), (1, 2, 1), (1, 3, 1), (1, 4, 1), (1, 5, 1), (1, 6, 1)
;
INSERT INTO "ingredients" ("ingredient_name")
VALUES ("Tea"), ("Honey"), ("Rusks"), ("Peanut Butter"), ("Jam (low sugars)")
;
INSERT INTO "ingredients_usage" ("meal_id", "ingredient_id", "quantity")
VALUES
    (1, (SELECT id FROM ingredients WHERE ingredient_name = 'Tea'), 200),
    (1, (SELECT id FROM ingredients WHERE ingredient_name = 'Honey'), 5),
    (1, (SELECT id FROM ingredients WHERE ingredient_name = 'Rusks'), 50),
    (1, (SELECT id FROM ingredients WHERE ingredient_name = 'Peanut Butter'), 10),
    (1, (SELECT id FROM ingredients WHERE ingredient_name = 'Jam (low sugars)'), 25)
;
INSERT INTO "ingredients_usage" ("meal_id", "ingredient_id", "quantity")
VALUES
    (2, (SELECT id FROM ingredients WHERE ingredient_name = 'Tea'), 200),
    (2, (SELECT id FROM ingredients WHERE ingredient_name = 'Honey'), 5),
    (2, (SELECT id FROM ingredients WHERE ingredient_name = 'Rusks'), 40),
    (2, (SELECT id FROM ingredients WHERE ingredient_name = 'Peanut Butter'), 5),
    (2, (SELECT id FROM ingredients WHERE ingredient_name = 'Jam (low sugars)'), 20)
;
INSERT INTO "ingredients_usage" ("meal_id", "ingredient_id", "quantity")
VALUES
    (3, (SELECT id FROM ingredients WHERE ingredient_name = 'Tea'), 200),
    (3, (SELECT id FROM ingredients WHERE ingredient_name = 'Honey'), 5),
    (3, (SELECT id FROM ingredients WHERE ingredient_name = 'Rusks'), 60),
    (3, (SELECT id FROM ingredients WHERE ingredient_name = 'Peanut Butter'), 10),
    (3, (SELECT id FROM ingredients WHERE ingredient_name = 'Jam (low sugars)'), 30)
;
INSERT INTO "ingredients_usage" ("meal_id", "ingredient_id", "quantity")
VALUES
    (4, (SELECT id FROM ingredients WHERE ingredient_name = 'Tea'), 200),
    (4, (SELECT id FROM ingredients WHERE ingredient_name = 'Honey'), 5),
    (4, (SELECT id FROM ingredients WHERE ingredient_name = 'Rusks'), 40),
    (4, (SELECT id FROM ingredients WHERE ingredient_name = 'Peanut Butter'), 5),
    (4, (SELECT id FROM ingredients WHERE ingredient_name = 'Jam (low sugars)'), 30)
;
INSERT INTO "ingredients_usage" ("meal_id", "ingredient_id", "quantity")
VALUES
    (5, (SELECT id FROM ingredients WHERE ingredient_name = 'Tea'), 200),
    (5, (SELECT id FROM ingredients WHERE ingredient_name = 'Honey'), 5),
    (5, (SELECT id FROM ingredients WHERE ingredient_name = 'Rusks'), 60),
    (5, (SELECT id FROM ingredients WHERE ingredient_name = 'Peanut Butter'), 10),
    (5, (SELECT id FROM ingredients WHERE ingredient_name = 'Jam (low sugars)'), 30)
;
INSERT INTO "ingredients_usage" ("meal_id", "ingredient_id", "quantity")
VALUES
    (6, (SELECT id FROM ingredients WHERE ingredient_name = 'Tea'), 200),
    (6, (SELECT id FROM ingredients WHERE ingredient_name = 'Honey'), 5),
    (6, (SELECT id FROM ingredients WHERE ingredient_name = 'Rusks'), 40),
    (6, (SELECT id FROM ingredients WHERE ingredient_name = 'Peanut Butter'), 5),
    (6, (SELECT id FROM ingredients WHERE ingredient_name = 'Jam (low sugars)'), 25)
;

COMMIT;