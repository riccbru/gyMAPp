BEGIN TRANSACTION;

-- *************************************** --
-- *****            TABLES           ***** --
-- *************************************** --

CREATE TABLE IF NOT EXISTS "users" (
    "uid" INTEGER PRIMARY KEY AUTOINCREMENT,
    "admin" INTEGER NOT NULL CHECK ("admin" in (0, 1)) DEFAULT 0,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "birthdate" TEXT NOT NULL,
    "username" TEXT NOT NULL UNIQUE,
    "hash" TEXT NOT NULL,   
    "salt" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "weights" (
    "weid" INTEGER PRIMARY KEY AUTOINCREMENT,
    "uid" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "weight" REAL NOT NULL,

    FOREIGN KEY (uid) REFERENCES users(uid) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "bias" (
    "bid" INTEGER PRIMARY KEY AUTOINCREMENT,
    "uid" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "height" REAL NOT NULL,
    "weight" REAL NOT NULL,
    "body_mass_index" REAL NOT NULL,
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
    "mid" INTEGER PRIMARY KEY AUTOINCREMENT,
    "uid" INTEGER NOT NULL,
    "weekday" INTEGER NOT NULL CHECK ("weekday" BETWEEN 1 AND 7), 
    "meal_type" INTEGER NOT NULL CHECK ("meal_type" BETWEEN 1 AND 7),

    FOREIGN KEY (uid) REFERENCES users(uid) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "ingredients" (
  "iid" INTEGER PRIMARY KEY AUTOINCREMENT,
  "ingredient_name" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "ingredients_usage" (
    "meal_id" INTEGER NOT NULL,
    "option_id" INTEGER NOT NULL DEFAULT 1,
    "ingredient_id" INTEGER NOT NULL,
    "quantity" REAL NOT NULL,

    PRIMARY KEY (meal_id, option_id, ingredient_id),
    FOREIGN KEY (meal_id) REFERENCES meals(mid) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(iid) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "workouts" (
    wid INTEGER PRIMARY KEY AUTOINCREMENT,
    uid INTEGER NOT NULL,
    weekday INTEGER NOT NULL CHECK (weekday IN (1, 3, 5)),
    FOREIGN KEY (uid) REFERENCES users(uid)
);

CREATE TABLE IF NOT EXISTS "exercises" (
    eid INTEGER PRIMARY KEY AUTOINCREMENT,
    wid INTEGER NOT NULL,
    name TEXT NOT NULL,
    sets INTEGER,
    reps INTEGER,
    weight INTEGER,
    rest INTEGER NOT NULL,
    FOREIGN KEY (wid) REFERENCES workouts(wid)
);


-- *************************************** --
-- *****       USER & BIA DATA       ***** --
-- *************************************** --

INSERT INTO "users" (
    "admin", "name", "email", "birthdate", "username", "hash", "salt"
) VALUES (
    1, "Riccardo Bruno", "riccardo.bruno@gymapp.dev", "11-25-1999", "bankich",
    -- "e982818124aab7af645a118a321edcc5af4798548a2f4819a192f21f173be85c9123d3911903f602c5d787f6074cdbf0d42114bcc5843ea2cbe9b3163b6508b8", 'password'
    "5e0ccfe6cdb2d4e502b8c7463c32f4a758fd91bf446645c98d65b6ad8367beb1b93f1d5b54d972b9daf5ef3438bea8f1a0210101e32dbb2f4ddef5fac0e348f5",
    "c631ac0affd7db484f8d0103e706d3c8"
);

INSERT INTO "users" (
    "admin", "name", "email", "birthdate", "username", "hash", "salt"
) VALUES (
    0, "Ciclarimpo", "ciclarimpo@gymapp.dev", "01-01-0001", "ciclarimpo",
    "e94959bd74a547cb72cca16f55c319547a95fb481d5cc2e436759e08a61453d0180d96961791a1eb7a45c24a56d9cd791a3074e6db6da998ebcdd16b19fd33c1",
    "38d0246251f259a305c5af38b17d026b"
);

INSERT INTO "weights" ( "uid", "date", "weight" )
VALUES ( 1, "08-31-2024", 91.2 );

INSERT INTO "bias" (
    "uid", "date", "height", "weight", "body_mass_index",
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





-- *************************************** --
-- *****           WORKOUTS          ***** --
-- *************************************** --
INSERT INTO "workouts" ("uid", "weekday") VALUES (1, 1), (1, 3), (1, 5);
-- Monday --
INSERT INTO "exercises" ("wid", "name", "sets", "reps", "rest") VALUES ((SELECT wid FROM workouts WHERE uid = 1 AND weekday = 1), "Pull up", 5, 4, 150);
INSERT INTO "exercises" ("wid", "name", "sets", "reps", "weight", "rest")
VALUES
    ((SELECT wid FROM workouts WHERE uid = 1 AND weekday = 1), "Dip", 5, 8, 10, 150),
    ((SELECT wid FROM workouts WHERE uid = 1 AND weekday = 1), "Bench press", 5, 15, 40, 30),
    ((SELECT wid FROM workouts WHERE uid = 1 AND weekday = 1), "Incline bench press", 5, 15, 30, 30),
    ((SELECT wid FROM workouts WHERE uid = 1 AND weekday = 1), "Pulley", 5, 15, 20, 30),
    ((SELECT wid FROM workouts WHERE uid = 1 AND weekday = 1), "Pull down", 5, 15, 15, 30),
    ((SELECT wid FROM workouts WHERE uid = 1 AND weekday = 1), "Hammer curl", 5, 15, 6, 30),
    ((SELECT wid FROM workouts WHERE uid = 1 AND weekday = 1), "Seated bicep curl", 5, 15, 4, 30);
INSERT INTO "exercises" ("wid", "name", "rest") VALUES ((SELECT wid FROM workouts WHERE uid = 1 AND weekday = 1), "ABS circuit", 0);
-- Wednesday --
INSERT INTO "exercises" ("wid", "name", "sets", "reps", "weight", "rest")
VALUES
    ((SELECT wid FROM workouts WHERE uid = 1 AND weekday = 3), "Leg extension", 5, 15, 25, 30),
    ((SELECT wid FROM workouts WHERE uid = 1 AND weekday = 3), "Leg curl", 5, 15, 30, 30),
    ((SELECT wid FROM workouts WHERE uid = 1 AND weekday = 3), "Leg press", 5, 10, 45, 90),
    ((SELECT wid FROM workouts WHERE uid = 1 AND weekday = 3), "Lunges", 4, 20, 45, 60),
    ((SELECT wid FROM workouts WHERE uid = 1 AND weekday = 3), "Single leg deadlift", 4, 15, 12, 60),
    ((SELECT wid FROM workouts WHERE uid = 1 AND weekday = 3), "Seated calf raise", 5, 15, 20, 30),
    ((SELECT wid FROM workouts WHERE uid = 1 AND weekday = 3), "Calf raise", 5, 15, 20, 0);
INSERT INTO "exercises" ("wid", "name", "rest") VALUES ((SELECT wid FROM workouts WHERE uid = 1 AND weekday = 3), "ABS circuit", 0);
-- Friday --
INSERT INTO "exercises" ("wid", "name", "sets", "reps", "rest")
VALUES

    ((SELECT wid FROM workouts WHERE uid = 1 AND weekday = 5), "Chin up", 5, 5, 120),
    ((SELECT wid FROM workouts WHERE uid = 1 AND weekday = 5), "Push up & 10s plank piramid", 4, 25, 180);
INSERT INTO "exercises" ("wid", "name", "sets", "reps", "weight", "rest")
VALUES
    ((SELECT wid FROM workouts WHERE uid = 1 AND weekday = 5), "Shoulder fly", 5, 15, 5, 30),
    ((SELECT wid FROM workouts WHERE uid = 1 AND weekday = 5), "Shoulder press", 5, 15, 5, 60),
    ((SELECT wid FROM workouts WHERE uid = 1 AND weekday = 5), "Fly", 5, 20, 5, 60),
    ((SELECT wid FROM workouts WHERE uid = 1 AND weekday = 5), "Push down (bullballz)", 5, 15, 25, 30),
    ((SELECT wid FROM workouts WHERE uid = 1 AND weekday = 5), "Push down (W wheel)", 5, 15, 20, 30),
    ((SELECT wid FROM workouts WHERE uid = 1 AND weekday = 5), "Kick back", 5, 15, 5, 30);
INSERT INTO "exercises" ("wid", "name", "rest") VALUES ((SELECT wid FROM workouts WHERE uid = 1 AND weekday = 5), "ABS circuit", 0);






-- *************************************** --
-- *****            MEALS            ***** --
-- *************************************** --
-- Breakfast --
INSERT INTO "meals" ("uid", "weekday", "meal_type")
VALUES (1, 1, 1), (1, 2, 1), (1, 3, 1), (1, 4, 1), (1, 5, 1), (1, 6, 1);
-- Morning Snack --
INSERT INTO "meals" ("uid", "weekday", "meal_type")
VALUES (1, 1, 2), (1, 2, 2), (1, 3, 2), (1, 4, 2), (1, 5, 2), (1, 6, 2);
-- Lunch --
INSERT INTO "meals" ("uid", "weekday", "meal_type")
VALUES (1, 1, 3), (1, 2, 3), (1, 3, 3), (1, 4, 3), (1, 5, 3), (1, 6, 3);
-- Afternoon Snack --
INSERT INTO "meals" ("uid", "weekday", "meal_type")
VALUES (1, 1, 4), (1, 2, 4), (1, 3, 4), (1, 4, 4), (1, 5, 4), (1, 6, 4);
-- Dinner --
INSERT INTO "meals" ("uid", "weekday", "meal_type")
VALUES (1, 1, 5), (1, 2, 5), (1, 3, 5), (1, 4, 5), (1, 5, 5), (1, 6, 5);
-- Midnight Snack --
INSERT INTO "meals" ("uid", "weekday", "meal_type")
VALUES (1, 1, 6), (1, 2, 6), (1, 3, 6), (1, 4, 6), (1, 5, 6), (1, 6, 6);



-- *************************************** --
-- *****         INGREDIENTS         ***** --
-- *************************************** --
INSERT INTO "ingredients" ("ingredient_name")
VALUES
    -- Breakfast --
    ("Tea"), ("Honey"), ("Rusks"), ("Peanut Butter"), ("Jam (low sugars)"),
    -- Morning snack --
    ("Banana"), ("Almonds"), ("Apples"), ("Hazelnuts"), ("Walnuts"), ("Clementines"),
    -- Lunch --
    ("Pasta"), ("Parmigiano"), ("Ricotta"), ("Spinach"), ("EVO"), ("Parboiled rice"), ("Beans"), ("Carrots"),
    ("Whole wheat pasta"), ("Tuna tin"), ("Mixed salad"), ("Robiola"), ("Courgettes"),
    -- Afternoon snack --
    ("Whole wheat bread"), ("Bresaola (low fat)"), ("Fruit yogurt (low fat)"), ("Walnuts"),
    -- Dinner --
    ("Potatoes"), ("Mozzarella (cow)"), ("Broccoli"), ("Fillet"), ("Beet leaves"), ("Eggs"),
    ("Codfish"), ("Tomatoes"), ("Chicken breast"), ("Fennels"), ("Beef (low fat)"),
    ("Gilthead bream"), ("Arugula"), ("French beans"), ("Fresh tuna"), ("Lettuce"),
    -- Night snack --
    ("Greek yogurt (no fats)");



-- *************************************** --                                                                    
-- *****          BREAKFAST          ***** --
-- *************************************** --
-- Monday --
INSERT INTO "ingredients_usage" ("meal_id", "ingredient_id", "quantity")
VALUES
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 1 AND meal_type = 1), (SELECT iid FROM ingredients WHERE ingredient_name = 'Tea'), 200),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 1 AND meal_type = 1), (SELECT iid FROM ingredients WHERE ingredient_name = 'Honey'), 5),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 1 AND meal_type = 1), (SELECT iid FROM ingredients WHERE ingredient_name = 'Rusks'), 50),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 1 AND meal_type = 1), (SELECT iid FROM ingredients WHERE ingredient_name = 'Peanut Butter'), 10),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 1 AND meal_type = 1), (SELECT iid FROM ingredients WHERE ingredient_name = 'Jam (low sugars)'), 25);
--Tuesday--
INSERT INTO "ingredients_usage" ("meal_id", "ingredient_id", "quantity")
VALUES
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 2 AND meal_type = 1), (SELECT iid FROM ingredients WHERE ingredient_name = 'Tea'), 200),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 2 AND meal_type = 1), (SELECT iid FROM ingredients WHERE ingredient_name = 'Honey'), 5),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 2 AND meal_type = 1), (SELECT iid FROM ingredients WHERE ingredient_name = 'Rusks'), 40),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 2 AND meal_type = 1), (SELECT iid FROM ingredients WHERE ingredient_name = 'Peanut Butter'), 5),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 2 AND meal_type = 1), (SELECT iid FROM ingredients WHERE ingredient_name = 'Jam (low sugars)'), 20);
-- Wednesday --
INSERT INTO "ingredients_usage" ("meal_id", "ingredient_id", "quantity")
VALUES
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 3 AND meal_type = 1), (SELECT iid FROM ingredients WHERE ingredient_name = 'Tea'), 200),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 3 AND meal_type = 1), (SELECT iid FROM ingredients WHERE ingredient_name = 'Honey'), 5),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 3 AND meal_type = 1), (SELECT iid FROM ingredients WHERE ingredient_name = 'Rusks'), 60),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 3 AND meal_type = 1), (SELECT iid FROM ingredients WHERE ingredient_name = 'Peanut Butter'), 10),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 3 AND meal_type = 1), (SELECT iid FROM ingredients WHERE ingredient_name = 'Jam (low sugars)'), 30);
-- Thursday --
INSERT INTO "ingredients_usage" ("meal_id", "ingredient_id", "quantity")
VALUES
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 4 AND meal_type = 1), (SELECT iid FROM ingredients WHERE ingredient_name = 'Tea'), 200),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 4 AND meal_type = 1), (SELECT iid FROM ingredients WHERE ingredient_name = 'Honey'), 5),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 4 AND meal_type = 1), (SELECT iid FROM ingredients WHERE ingredient_name = 'Rusks'), 40),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 4 AND meal_type = 1), (SELECT iid FROM ingredients WHERE ingredient_name = 'Peanut Butter'), 5),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 4 AND meal_type = 1), (SELECT iid FROM ingredients WHERE ingredient_name = 'Jam (low sugars)'), 30);
-- Friday --
INSERT INTO "ingredients_usage" ("meal_id", "ingredient_id", "quantity")
VALUES
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 1), (SELECT iid FROM ingredients WHERE ingredient_name = 'Tea'), 200),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 1), (SELECT iid FROM ingredients WHERE ingredient_name = 'Honey'), 5),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 1), (SELECT iid FROM ingredients WHERE ingredient_name = 'Rusks'), 60),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 1), (SELECT iid FROM ingredients WHERE ingredient_name = 'Peanut Butter'), 10),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 1), (SELECT iid FROM ingredients WHERE ingredient_name = 'Jam (low sugars)'), 30);
-- Saturday --
INSERT INTO "ingredients_usage" ("meal_id", "ingredient_id", "quantity")
VALUES
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 6 AND meal_type = 1), (SELECT iid FROM ingredients WHERE ingredient_name = 'Tea'), 200),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 6 AND meal_type = 1), (SELECT iid FROM ingredients WHERE ingredient_name = 'Honey'), 5),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 6 AND meal_type = 1), (SELECT iid FROM ingredients WHERE ingredient_name = 'Rusks'), 40),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 6 AND meal_type = 1), (SELECT iid FROM ingredients WHERE ingredient_name = 'Peanut Butter'), 5),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 6 AND meal_type = 1), (SELECT iid FROM ingredients WHERE ingredient_name = 'Jam (low sugars)'), 25);



-- *************************************** --
-- *****        MORNING SNACK        ***** --
-- *************************************** --
-- Monday --
INSERT INTO "ingredients_usage" ("meal_id", "ingredient_id", "quantity")
VALUES
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 1 AND meal_type = 2), (SELECT iid FROM ingredients WHERE ingredient_name = 'Banana'), 100),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 1 AND meal_type = 2), (SELECT iid FROM ingredients WHERE ingredient_name = 'Almonds'), 10);
INSERT INTO "ingredients_usage" ("meal_id", "option_id", "ingredient_id", "quantity")
VALUES
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 1 AND meal_type = 2),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 1 AND meal_type = 2)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Apples'),
        140
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 1 AND meal_type = 2),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 1 AND meal_type = 2)), 
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Almonds'),
        10
    );
INSERT INTO "ingredients_usage" ("meal_id", "option_id", "ingredient_id", "quantity")
VALUES
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 1 AND meal_type = 2),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 1 AND meal_type = 2)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Clementines'),
        200
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 1 AND meal_type = 2),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 1 AND meal_type = 2)), 
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Almonds'),
        10
    );
-- Tuesday --
INSERT INTO "ingredients_usage" ("meal_id", "ingredient_id", "quantity")
VALUES
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 2 AND meal_type = 2), (SELECT iid FROM ingredients WHERE ingredient_name = 'Banana'), 100),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 2 AND meal_type = 2), (SELECT iid FROM ingredients WHERE ingredient_name = 'Almonds'), 10);
INSERT INTO "ingredients_usage" ("meal_id", "option_id", "ingredient_id", "quantity")
VALUES
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 2 AND meal_type = 2),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 2 AND meal_type = 2)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Apples'),
        120
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 2 AND meal_type = 2),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 2 AND meal_type = 2)), 
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Almonds'),
        10
    );
INSERT INTO "ingredients_usage" ("meal_id", "option_id", "ingredient_id", "quantity")
VALUES
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 2 AND meal_type = 2),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 2 AND meal_type = 2)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Clementines'),
        100
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 2 AND meal_type = 2),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 2 AND meal_type = 2)), 
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Walnuts'),
        10
    );
-- Wednesday --
INSERT INTO "ingredients_usage" ("meal_id", "ingredient_id", "quantity")
VALUES
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 3 AND meal_type = 2), (SELECT iid FROM ingredients WHERE ingredient_name = 'Banana'), 150),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 3 AND meal_type = 2), (SELECT iid FROM ingredients WHERE ingredient_name = 'Almonds'), 10);
INSERT INTO "ingredients_usage" ("meal_id", "option_id", "ingredient_id", "quantity")
VALUES
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 3 AND meal_type = 2),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 3 AND meal_type = 2)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Apples'),
        150
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 3 AND meal_type = 2),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 3 AND meal_type = 2)), 
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Almonds'),
        10
    );
INSERT INTO "ingredients_usage" ("meal_id", "option_id", "ingredient_id", "quantity")
VALUES
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 3 AND meal_type = 2),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 3 AND meal_type = 2)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Clementines'),
        200
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 3 AND meal_type = 2),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 3 AND meal_type = 2)), 
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Almonds'),
        10
    );
-- Thursday --
INSERT INTO "ingredients_usage" ("meal_id", "ingredient_id", "quantity")
VALUES
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 4 AND meal_type = 2), (SELECT iid FROM ingredients WHERE ingredient_name = 'Banana'), 100),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 4 AND meal_type = 2), (SELECT iid FROM ingredients WHERE ingredient_name = 'Hazelnuts'), 10);
INSERT INTO "ingredients_usage" ("meal_id", "option_id", "ingredient_id", "quantity")
VALUES
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 4 AND meal_type = 2),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 4 AND meal_type = 2)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Apples'),
        140
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 4 AND meal_type = 2),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 4 AND meal_type = 2)), 
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Hazelnuts'),
        10
    );
INSERT INTO "ingredients_usage" ("meal_id", "option_id", "ingredient_id", "quantity")
VALUES
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 4 AND meal_type = 2),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 4 AND meal_type = 2)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Clementines'),
        100
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 4 AND meal_type = 2),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 4 AND meal_type = 2)), 
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Almonds'),
        10
    );
-- Friday --
INSERT INTO "ingredients_usage" ("meal_id", "ingredient_id", "quantity")
VALUES
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 2), (SELECT iid FROM ingredients WHERE ingredient_name = 'Banana'), 150),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 2), (SELECT iid FROM ingredients WHERE ingredient_name = 'Walnuts'), 10);
INSERT INTO "ingredients_usage" ("meal_id", "option_id", "ingredient_id", "quantity")
VALUES
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 2),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 2)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Apples'),
        160
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 2),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 2)), 
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Hazelnuts'),
        10
    );
INSERT INTO "ingredients_usage" ("meal_id", "option_id", "ingredient_id", "quantity")
VALUES
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 2),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 2)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Clementines'),
        200
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 2),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 2)), 
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Hazelnuts'),
        10
    );
-- Saturday --
INSERT INTO "ingredients_usage" ("meal_id", "ingredient_id", "quantity")
VALUES
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 6 AND meal_type = 2), (SELECT iid FROM ingredients WHERE ingredient_name = 'Banana'), 100),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 6 AND meal_type = 2), (SELECT iid FROM ingredients WHERE ingredient_name = 'Walnuts'), 10);
INSERT INTO "ingredients_usage" ("meal_id", "option_id", "ingredient_id", "quantity")
VALUES
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 6 AND meal_type = 2),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 6 AND meal_type = 2)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Apples'),
        130
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 6 AND meal_type = 2),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 6 AND meal_type = 2)), 
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Walnuts'),
        10
    );
INSERT INTO "ingredients_usage" ("meal_id", "option_id", "ingredient_id", "quantity")
VALUES
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 6 AND meal_type = 2),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 6 AND meal_type = 2)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Clementines'),
        100
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 6 AND meal_type = 2),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 6 AND meal_type = 2)), 
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Walnuts'),
        10
    );



-- *************************************** --
-- *****            LUNCH            ***** --
-- *************************************** --
-- Monday --
INSERT INTO "ingredients_usage" ("meal_id", "ingredient_id", "quantity")
VALUES
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 1 AND meal_type = 3), (SELECT iid FROM ingredients WHERE ingredient_name = 'Pasta'), 110),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 1 AND meal_type = 3), (SELECT iid FROM ingredients WHERE ingredient_name = 'Parmigiano'), 5),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 1 AND meal_type = 3), (SELECT iid FROM ingredients WHERE ingredient_name = 'Ricotta'), 160),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 1 AND meal_type = 3), (SELECT iid FROM ingredients WHERE ingredient_name = 'Spinach'), 100),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 1 AND meal_type = 3), (SELECT iid FROM ingredients WHERE ingredient_name = 'EVO'), 20);
-- Tuesday --
INSERT INTO "ingredients_usage" ("meal_id", "ingredient_id", "quantity")
VALUES
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 2 AND meal_type = 3), (SELECT iid FROM ingredients WHERE ingredient_name = 'Parboiled rice'), 90),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 2 AND meal_type = 3), (SELECT iid FROM ingredients WHERE ingredient_name = 'Parmigiano'), 5),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 2 AND meal_type = 3), (SELECT iid FROM ingredients WHERE ingredient_name = 'Beans'), 100),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 2 AND meal_type = 3), (SELECT iid FROM ingredients WHERE ingredient_name = 'Carrots'), 160),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 2 AND meal_type = 3), (SELECT iid FROM ingredients WHERE ingredient_name = 'EVO'), 20);
INSERT INTO "ingredients_usage" ("meal_id", "option_id", "ingredient_id", "quantity")
VALUES
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 2 AND meal_type = 3),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 2 AND meal_type = 3)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Whole wheat pasta'),
        100
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 2 AND meal_type = 3),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 2 AND meal_type = 3)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Parmigiano'),
        5
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 2 AND meal_type = 3),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 2 AND meal_type = 3)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Tuna tin'),
        160
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 2 AND meal_type = 3),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 2 AND meal_type = 3)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Mixed salad'),
        200
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 2 AND meal_type = 3),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 2 AND meal_type = 3)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'EVO'),
        20
    );
-- Wednesday --
INSERT INTO "ingredients_usage" ("meal_id", "ingredient_id", "quantity")
VALUES
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 3 AND meal_type = 3), (SELECT iid FROM ingredients WHERE ingredient_name = 'Parboiled rice'), 100),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 3 AND meal_type = 3), (SELECT iid FROM ingredients WHERE ingredient_name = 'Parmigiano'), 5),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 3 AND meal_type = 3), (SELECT iid FROM ingredients WHERE ingredient_name = 'Beans'), 90),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 3 AND meal_type = 3), (SELECT iid FROM ingredients WHERE ingredient_name = 'Carrots'), 100),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 3 AND meal_type = 3), (SELECT iid FROM ingredients WHERE ingredient_name = 'EVO'), 20);
-- Thursday --
INSERT INTO "ingredients_usage" ("meal_id", "ingredient_id", "quantity")
VALUES
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 4 AND meal_type = 3), (SELECT iid FROM ingredients WHERE ingredient_name = 'Parboiled rice'), 130),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 4 AND meal_type = 3), (SELECT iid FROM ingredients WHERE ingredient_name = 'Parmigiano'), 5),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 4 AND meal_type = 3), (SELECT iid FROM ingredients WHERE ingredient_name = 'Beans'), 60),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 4 AND meal_type = 3), (SELECT iid FROM ingredients WHERE ingredient_name = 'Carrots'), 100),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 4 AND meal_type = 3), (SELECT iid FROM ingredients WHERE ingredient_name = 'EVO'), 20);
INSERT INTO "ingredients_usage" ("meal_id", "option_id", "ingredient_id", "quantity")
VALUES
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 4 AND meal_type = 3),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 4 AND meal_type = 3)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Whole wheat pasta'),
        140
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 4 AND meal_type = 3),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 4 AND meal_type = 3)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Parmigiano'),
        5
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 4 AND meal_type = 3),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 4 AND meal_type = 3)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Robiola'),
        70
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 4 AND meal_type = 3),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 4 AND meal_type = 3)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Courgettes'),
        300
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 4 AND meal_type = 3),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 4 AND meal_type = 3)), 
        (SELECT iid FROM ingredients WHERE ingredient_name = 'EVO'),
        20
    );
-- Friday --
INSERT INTO "ingredients_usage" ("meal_id", "ingredient_id", "quantity")
VALUES
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 3), (SELECT iid FROM ingredients WHERE ingredient_name = 'Whole wheat pasta'), 130),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 3), (SELECT iid FROM ingredients WHERE ingredient_name = 'Parmigiano'), 5),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 3), (SELECT iid FROM ingredients WHERE ingredient_name = 'Codfish'), 250),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 3), (SELECT iid FROM ingredients WHERE ingredient_name = 'Broccoli'), 100),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 3), (SELECT iid FROM ingredients WHERE ingredient_name = 'EVO'), 20);
INSERT INTO "ingredients_usage" ("meal_id", "option_id", "ingredient_id", "quantity")
VALUES
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 3),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 3)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Whole wheat pasta'),
        140
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 3),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 3)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Parmigiano'),
        5
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 3),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 3)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Robiola'),
        70
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 3),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 3)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Courgettes'),
        300
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 3),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 3)), 
        (SELECT iid FROM ingredients WHERE ingredient_name = 'EVO'),
        20
    );
INSERT INTO "ingredients_usage" ("meal_id", "option_id", "ingredient_id", "quantity")
VALUES
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 3),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 3)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Whole wheat pasta'),
        140
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 3),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 3)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Parmigiano'),
        5
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 3),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 3)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Tuna tin'),
        130
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 3),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 3)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Mixed salad'),
        200
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 3),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 3)), 
        (SELECT iid FROM ingredients WHERE ingredient_name = 'EVO'),
        20
    );
-- Saturday --
INSERT INTO "ingredients_usage" ("meal_id", "ingredient_id", "quantity")
VALUES
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 6 AND meal_type = 3), (SELECT iid FROM ingredients WHERE ingredient_name = 'Pasta'), 110),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 6 AND meal_type = 3), (SELECT iid FROM ingredients WHERE ingredient_name = 'Parmigiano'), 5),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 6 AND meal_type = 3), (SELECT iid FROM ingredients WHERE ingredient_name = 'Codfish'), 250),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 6 AND meal_type = 3), (SELECT iid FROM ingredients WHERE ingredient_name = 'Broccoli'), 150),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 6 AND meal_type = 3), (SELECT iid FROM ingredients WHERE ingredient_name = 'EVO'), 20);
INSERT INTO "ingredients_usage" ("meal_id", "option_id", "ingredient_id", "quantity")
VALUES
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 6 AND meal_type = 3),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 6 AND meal_type = 3)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Whole wheat pasta'),
        120
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 6 AND meal_type = 3),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 6 AND meal_type = 3)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Parmigiano'),
        5
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 6 AND meal_type = 3),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 6 AND meal_type = 3)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Ricotta'),
        100
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 6 AND meal_type = 3),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 6 AND meal_type = 3)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Spinach'),
        100
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 6 AND meal_type = 3),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 6 AND meal_type = 3)), 
        (SELECT iid FROM ingredients WHERE ingredient_name = 'EVO'),
        20
    );
INSERT INTO "ingredients_usage" ("meal_id", "option_id", "ingredient_id", "quantity")
VALUES
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 3),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 3)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Whole wheat pasta'),
        140
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 3),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 3)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Parmigiano'),
        5
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 3),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 3)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Tuna tin'),
        130
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 3),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 3)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Mixed salad'),
        200
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 3),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 3)), 
        (SELECT iid FROM ingredients WHERE ingredient_name = 'EVO'),
        20
    );



-- *************************************** --
-- *****       AFTERNOON SNACK       ***** --
-- *************************************** --
-- Monday --
INSERT INTO "ingredients_usage" ("meal_id", "ingredient_id", "quantity")
VALUES
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 1 AND meal_type = 4), (SELECT iid FROM ingredients WHERE ingredient_name = 'Whole wheat bread'), 120),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 1 AND meal_type = 4), (SELECT iid FROM ingredients WHERE ingredient_name = 'Bresaola (low fat)'), 40);
-- Tuesday --
INSERT INTO "ingredients_usage" ("meal_id", "ingredient_id", "quantity")
VALUES
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 2 AND meal_type = 4), (SELECT iid FROM ingredients WHERE ingredient_name = 'Fruit yogurt (low fat)'), 250),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 2 AND meal_type = 4), (SELECT iid FROM ingredients WHERE ingredient_name = 'Walnuts'), 10);
-- Wednesday --
INSERT INTO "ingredients_usage" ("meal_id", "ingredient_id", "quantity")
VALUES
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 3 AND meal_type = 4), (SELECT iid FROM ingredients WHERE ingredient_name = 'Whole wheat bread'), 110),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 3 AND meal_type = 4), (SELECT iid FROM ingredients WHERE ingredient_name = 'Bresaola (low fat)'), 50);
-- Thursday --
INSERT INTO "ingredients_usage" ("meal_id", "ingredient_id", "quantity")
VALUES
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 4 AND meal_type = 4), (SELECT iid FROM ingredients WHERE ingredient_name = 'Fruit yogurt (low fat)'), 220),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 4 AND meal_type = 4), (SELECT iid FROM ingredients WHERE ingredient_name = 'Almonds'), 10);
-- Friday --
INSERT INTO "ingredients_usage" ("meal_id", "ingredient_id", "quantity")
VALUES
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 4), (SELECT iid FROM ingredients WHERE ingredient_name = 'Whole wheat bread'), 100),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 4), (SELECT iid FROM ingredients WHERE ingredient_name = 'Bresaola (low fat)'), 40);
-- Saturday --
INSERT INTO "ingredients_usage" ("meal_id", "ingredient_id", "quantity")
VALUES
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 6 AND meal_type = 4), (SELECT iid FROM ingredients WHERE ingredient_name = 'Fruit yogurt (low fat)'), 220),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 6 AND meal_type = 4), (SELECT iid FROM ingredients WHERE ingredient_name = 'Almonds'), 10);



-- *************************************** --
-- *****           DINNER            ***** --
-- *************************************** --
-- Monday --
INSERT INTO "ingredients_usage" ("meal_id", "ingredient_id", "quantity")
VALUES
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 1 AND meal_type = 5), ((SELECT iid FROM ingredients WHERE ingredient_name = 'Potatoes')), 250),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 1 AND meal_type = 5), ((SELECT iid FROM ingredients WHERE ingredient_name = 'Mozzarella (cow)')), 60),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 1 AND meal_type = 5), ((SELECT iid FROM ingredients WHERE ingredient_name = 'Broccoli')), 100),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 1 AND meal_type = 5), ((SELECT iid FROM ingredients WHERE ingredient_name = 'EVO')), 15);
-- Tuesday --
INSERT INTO "ingredients_usage" ("meal_id", "ingredient_id", "quantity")
VALUES
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 2 AND meal_type = 5), (SELECT iid FROM ingredients WHERE ingredient_name = 'Potatoes'), 250),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 2 AND meal_type = 5), (SELECT iid FROM ingredients WHERE ingredient_name = 'Fillet'), 100),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 2 AND meal_type = 5), (SELECT iid FROM ingredients WHERE ingredient_name = 'Beet leaves'), 150),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 2 AND meal_type = 5), (SELECT iid FROM ingredients WHERE ingredient_name = 'EVO'), 15);
INSERT INTO "ingredients_usage" ("meal_id", "option_id", "ingredient_id", "quantity")
VALUES
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 2 AND meal_type = 5),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 2 AND meal_type = 5)), 
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Whole wheat bread'),
        90
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 2 AND meal_type = 5),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 2 AND meal_type = 5)), 
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Eggs'),
        60
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 2 AND meal_type = 5),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 2 AND meal_type = 5)), 
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Spinach'),
        100
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 2 AND meal_type = 5),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 2 AND meal_type = 5)), 
        (SELECT iid FROM ingredients WHERE ingredient_name = 'EVO'),
        15
    );
-- Wednesday --
INSERT INTO "ingredients_usage" ("meal_id", "ingredient_id", "quantity")
VALUES
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 3 AND meal_type = 5), (SELECT iid FROM ingredients WHERE ingredient_name = 'Whole wheat bread'), 100),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 3 AND meal_type = 5), (SELECT iid FROM ingredients WHERE ingredient_name = 'Chicken breast'), 180),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 3 AND meal_type = 5), (SELECT iid FROM ingredients WHERE ingredient_name = 'Fennels'), 250),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 3 AND meal_type = 5), (SELECT iid FROM ingredients WHERE ingredient_name = 'EVO'), 15);
INSERT INTO "ingredients_usage" ("meal_id", "option_id", "ingredient_id", "quantity")
VALUES
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 3 AND meal_type = 5),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 3 AND meal_type = 5)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Potatoes'),
        300
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 3 AND meal_type = 5),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 3 AND meal_type = 5)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Codfish'),
        260
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 3 AND meal_type = 5),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 3 AND meal_type = 5)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Tomatoes'),
        100
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 3 AND meal_type = 5),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 3 AND meal_type = 5)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'EVO'),
        15
    );
INSERT INTO "ingredients_usage" ("meal_id", "option_id", "ingredient_id", "quantity")
VALUES
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 3 AND meal_type = 5),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 3 AND meal_type = 5)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Whole wheat bread'),
        100
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 3 AND meal_type = 5),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 3 AND meal_type = 5)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Mozzarella (cow)'),
        70
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 3 AND meal_type = 5),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 3 AND meal_type = 5)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Broccoli'),
        100
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 3 AND meal_type = 5),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 3 AND meal_type = 5)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'EVO'),
        15
    );
INSERT INTO "ingredients_usage" ("meal_id", "option_id", "ingredient_id", "quantity")
VALUES
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 3 AND meal_type = 5),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 3 AND meal_type = 5)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Whole wheat bread'),
        100
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 3 AND meal_type = 5),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 3 AND meal_type = 5)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Beef (low fat)'),
        140
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 3 AND meal_type = 5),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 3 AND meal_type = 5)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Carrots'),
        100
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 3 AND meal_type = 5),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 3 AND meal_type = 5)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'EVO'),
        15
    );
-- Thursday --
INSERT INTO "ingredients_usage" ("meal_id", "ingredient_id", "quantity")
VALUES
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 4 AND meal_type = 5), ((SELECT iid FROM ingredients WHERE ingredient_name = 'Potatoes')), 300),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 4 AND meal_type = 5), ((SELECT iid FROM ingredients WHERE ingredient_name = 'Eggs')), 120),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 4 AND meal_type = 5), ((SELECT iid FROM ingredients WHERE ingredient_name = 'Spinach')), 100),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 4 AND meal_type = 5), ((SELECT iid FROM ingredients WHERE ingredient_name = 'EVO')), 15);
INSERT INTO "ingredients_usage" ("meal_id", "option_id", "ingredient_id", "quantity")
VALUES
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 4 AND meal_type = 5),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 4 AND meal_type = 5)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Whole wheat bread'),
        110
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 4 AND meal_type = 5),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 4 AND meal_type = 5)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Gilthead bream'),
        90
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 4 AND meal_type = 5),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 4 AND meal_type = 5)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Arugula'),
        100
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 4 AND meal_type = 5),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 4 AND meal_type = 5)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'EVO'),
        15
    );
-- Friday --
INSERT INTO "ingredients_usage" ("meal_id", "ingredient_id", "quantity")
VALUES
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 5), ((SELECT iid FROM ingredients WHERE ingredient_name = 'Potatoes')), 300),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 5), ((SELECT iid FROM ingredients WHERE ingredient_name = 'Eggs')), 120),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 5), ((SELECT iid FROM ingredients WHERE ingredient_name = 'Spinach')), 100),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 5), ((SELECT iid FROM ingredients WHERE ingredient_name = 'EVO')), 15);
INSERT INTO "ingredients_usage" ("meal_id", "option_id", "ingredient_id", "quantity")
VALUES
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 5),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 5)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Whole wheat bread'),
        130
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 5),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 5)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Gilthead bream'),
        150
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 5),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 5)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Arugula'),
        100
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 5),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 5)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'EVO'),
        15
    );
INSERT INTO "ingredients_usage" ("meal_id", "option_id", "ingredient_id", "quantity")
VALUES
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 5),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 5)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Potatoes'),
        300
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 5),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 5)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Codfish'),
        200
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 5),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 5)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Tomatoes'),
        150
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 5),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 5)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'EVO'),
        15
    );
INSERT INTO "ingredients_usage" ("meal_id", "option_id", "ingredient_id", "quantity")
VALUES
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 5),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 5)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Potatoes'),
        300
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 5),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 5)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Fillet'),
        110
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 5),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 5)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'French beans'),
        150
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 5),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 5)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'EVO'),
        15
    );
-- Saturday --
INSERT INTO "ingredients_usage" ("meal_id", "ingredient_id", "quantity")
VALUES
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 6 AND meal_type = 5), ((SELECT iid FROM ingredients WHERE ingredient_name = 'Potatoes')), 300),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 6 AND meal_type = 5), ((SELECT iid FROM ingredients WHERE ingredient_name = 'Eggs')), 120),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 6 AND meal_type = 5), ((SELECT iid FROM ingredients WHERE ingredient_name = 'Spinach')), 100),
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 6 AND meal_type = 5), ((SELECT iid FROM ingredients WHERE ingredient_name = 'EVO')), 15);
INSERT INTO "ingredients_usage" ("meal_id", "option_id", "ingredient_id", "quantity")
VALUES
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 6 AND meal_type = 5),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 6 AND meal_type = 5)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Whole wheat bread'),
        110
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 6 AND meal_type = 5),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 6 AND meal_type = 5)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Fresh tuna'),
        140
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 6 AND meal_type = 5),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 6 AND meal_type = 5)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'Lettuce'),
        100
    ),
    (
        (SELECT mid FROM meals WHERE uid = 1 AND weekday = 6 AND meal_type = 5),
        (SELECT (COALESCE(MAX(option_id), 0) + 1) FROM ingredients_usage WHERE meal_id = (SELECT mid FROM meals WHERE uid = 1 AND weekday = 6 AND meal_type = 5)),
        (SELECT iid FROM ingredients WHERE ingredient_name = 'EVO'),
        15
    );



-- *************************************** --
-- *****         NIGHT SNACK         ***** --
-- *************************************** --
-- Monday --
INSERT INTO "ingredients_usage" ("meal_id", "ingredient_id", "quantity")
VALUES
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 1 AND meal_type = 6), (SELECT iid FROM ingredients WHERE ingredient_name = 'Greek yogurt (no fats)'), 160);
-- Tuesday --
INSERT INTO "ingredients_usage" ("meal_id", "ingredient_id", "quantity")
VALUES
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 2 AND meal_type = 6), (SELECT iid FROM ingredients WHERE ingredient_name = 'Greek yogurt (no fats)'), 150);
-- Wednesday --
INSERT INTO "ingredients_usage" ("meal_id", "ingredient_id", "quantity")
VALUES
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 3 AND meal_type = 6), (SELECT iid FROM ingredients WHERE ingredient_name = 'Greek yogurt (no fats)'), 160);
-- Thursday --
INSERT INTO "ingredients_usage" ("meal_id", "ingredient_id", "quantity")
VALUES
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 4 AND meal_type = 6), (SELECT iid FROM ingredients WHERE ingredient_name = 'Greek yogurt (no fats)'), 150);
-- Friday --
INSERT INTO "ingredients_usage" ("meal_id", "ingredient_id", "quantity")
VALUES
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 5 AND meal_type = 6), (SELECT iid FROM ingredients WHERE ingredient_name = 'Greek yogurt (no fats)'), 150);
-- Satuday --
INSERT INTO "ingredients_usage" ("meal_id", "ingredient_id", "quantity")
VALUES
    ((SELECT mid FROM meals WHERE uid = 1 AND weekday = 6 AND meal_type = 6), (SELECT iid FROM ingredients WHERE ingredient_name = 'Greek yogurt (no fats)'), 160);

COMMIT;