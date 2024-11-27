"use strict";

const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local");
const { body, check, param, query, validationResult } = require("express-validator");

const daoBias = require("./daoBias");
const daoUsers = require("./daoUsers");
const daoMeals = require("./daoMeals");
const daoWorkouts = require("./daoWorkouts");

const app = new express();

/*******************/
/***     CONF    ***/
/*******************/

const PORT = 3001;
const minDateChars = 8;
const minPassLength = 8;
const minEmailChars = 4;
const maxUserLength = 20;

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true
};

const sessionOptions = {
  secret: "CHANGE_IN_ENV_VAR",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: app.get("env") === "production" ? true : false,
  },
};

app.use(morgan("dev"));
app.use(express.json());
app.use(cors(corsOptions));
app.use(session(sessionOptions));
app.use(passport.authenticate("session"));

const errorFormatter = ({ location, msg }) => {
  return `${msg}`;
};

const isLogged = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.admin) {
    return next();
  } else {
    return res.status(503).json({ error: "Forbidden" });
  }
};

app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace
  res.status(500).send("Internal Server Error"); // Return a 500 error to client
});

app.listen(PORT, () => {
  console.log(
    `\x1b[42m[*]\x1b[0m \x1b[92mListening on port ${PORT}\x1b[0m (http://localhost:${PORT}/)`
  );
});

/******************/
/***  passport  ***/
/******************/

passport.use(
  new LocalStrategy(async function verify(username, password, callback) {
    try {
      const user = await daoUsers.login({ username, password });
      return callback(null, user);
    } catch (err) {
      return callback(null, false, "Incorrect username and/or password");
    }
  })
);

passport.serializeUser(function (user, callback) {
  callback(null, user);
});

passport.deserializeUser(function (user, callback) {
  return callback(null, user);
});

/******************/
/*** AuthN APIs ***/
/******************/

app.post("/api/v1/login",
  (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ error: info });
    }
    req.login(user, (err) => {
      if (err) return next(err);
      return res.json(req.user);
    });
  })(req, res, next);
});

app.post("/api/v1/signup",
  [
    body("name")
    .notEmpty()
    .withMessage("Your name can't be an empty string")
    .isString()
    .withMessage("Name must be string")
    .isLength({ min: 1, max: maxUserLength })
    .withMessage("Name length must be between 1 and 20"),
    body("email")
    .notEmpty()
    .withMessage("Your email can't be an empty string")
    .isString()
    .withMessage("Last time I checked emails were strings")
    .isLength({ min: minEmailChars })
    .withMessage("Your email can't be that short (user@domain.tld)")
    .isEmail()
    .withMessage("Invalid email, example: user@domain.tld"),
    body("birthdate")
    .notEmpty()
    .withMessage("Your birthdate can't be an empty string")
    .isString()
    .withMessage("Birthdate must be a string")
    .isLength({ min: minDateChars })
    .withMessage("Invalid birthdate")
    .matches(/^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-\d{4}$/)
    .withMessage("Birthdate must be in MM-DD-YYYY format")
    .bail()
    .isDate({ format: "MM-DD-YYYY", strictMode: true })
    .withMessage("Invalid birthdate"),
    body("username")
    .notEmpty()
    .withMessage("Your username can't be an empty string")
    .isString()
    .withMessage("Username must be a string")
    .isLength({ max: maxUserLength })
    .withMessage(`Username cannot exceed ${maxUserLength} characters`),
    body("password")
    .notEmpty()
    .withMessage("Your password can't be an empty string")
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: minPassLength })
    .withMessage(`Password must be at least ${minPassLength} characters`),
  ],
  async (req, res) => {
    if (req.isAuthenticated()) {
      return res.status(403).json({ error: `You are already logged in, ${req.user.username}` });
    } else {
      const errors = validationResult(req).formatWith(errorFormatter);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0] });
      }
      const user = { ...req.body };
      try {
        const call = await daoUsers.signup(user);
        return res.status(201).json({ success: call });
      } catch (err) {
        if (err.message.endsWith('not available')) {
          return res.status(409).json({ error: err.message });
        } else if (err.message.endsWith('users.email')) {
          return res.status(409).json({ error: `Email ${req.body.email} not available`});
        } else if (err.message.startsWith('SQL')) {
          return res.status(500).json({ error: "DB ERROR: please try again" });
        }
      }
    }
  }
);

app.get("/api/v1/session",
  (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
  } else {
    res.status(401).json({ error: "No active session" });
  }
});

app.delete("/api/v1/session", isLogged,
  (req, res) => {
  req.logout(() => {
    res.status(200).json({ success: "Logged out" });
  });
});

/*******************/
/***   BIA API   ***/
/*******************/

app.get("/api/v1/bia/:uid?", isLogged,
  async (req, res) => {
      try {
        const reqUID = req.params.uid || req.user.uid;
        const uid = req.user.admin && req.params.uid ? reqUID : req.user.uid;
        const bias = await daoBias.fetchBias(uid);
        res.status(200).json({ "BIAs" : bias });
      } catch (err) {
        res.status(404).json({ error: err });
      }
  }
);

app.post("/api/v1/bia/", isLogged,
  async (req, res) => {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0] });
    }
    const uid = req.user.uid;
    try {
      const bia = {uid: req.user.uid, ...req.body};
      const call = await daoBias.pushBia(bia);
      return res.status(201).json({ success: call });
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  }
);

/*********************/
/***   MEALS API   ***/
/*********************/

app.get("/api/v1/meals/", isLogged,
  [
    query('weekday')
      .isInt({ min: 0, max: 6 }).withMessage("'weekday' must an integer in [0, 6]"),
    query('meal')
      .isInt({ min: 0, max: 6 }).withMessage("'meal' must an integer in [0, 6]")
  ],
  async (req, res) => {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0] });
    }
    try {
      const uid = req.user.uid;
      const weekday = req.query.weekday;
      if (!weekday) {
        console.log("No meal");
      } else {
        const meal = req.query.meal;
        const meals = await daoMeals.fetchMeal(uid, weekday, meal);
        return res.status(200).json({ "options": meals });
      }
    } catch (err) {
      return res.status(404).json({ error: err });
    }
  }
);

/*********************/
/*      WORKOUT      */
/*********************/

app.get("/api/v1/workouts/:weekday", isLogged,
  [param('weekday').isInt({ min: 0, max: 6}).withMessage("'weekday' must be integer in [0, 6]")],
  async (req, res) => {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0] });
    }
    try {
      const uid = req.user.uid;
      const weekday = req.params.weekday;
      const workout = await daoWorkouts.fetchWorkout(uid, weekday);
      return res.status(200).json({ "exercises": workout });
    } catch (err) {
      return res.status(404).json({ error: err });
    }
  }
)
