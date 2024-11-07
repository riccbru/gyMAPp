"use strict";

const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const passport = require("passport");
const session = require('express-session');
const LocalStrategy = require("passport-local");
const { body, check, validationResult } = require('express-validator');

const daoUsers = require("./daoUsers");
const { validateName, validateEmail, validateDate, validateUsername, validatePassword } = require("./validators");

const app = new express();

/********/
/* CONF */
/********/

const PORT = 3001;
const minDateChars = 8;
const minPassLength = 8;
const minEmailChars = 4;
const maxUserLength = 20;

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

const sessionOptions = {
    secret: "CHANGE_IN_ENV_VAR",
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, secure: app.get('env') === 'production' ? true : false },
  };

app.use(morgan('dev'));
app.use(express.json());
app.use(cors(corsOptions));
app.use(session(sessionOptions));
app.use(passport.authenticate('session'));

const errorFormatter = ({ location, msg }) => {
    return `${msg}, check ${location}`;
};

const isLogged = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status(401).json({ error: "Not authorized" });
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
    console.error(err.stack);  // Log the error stack trace
    res.status(500).send('Internal Server Error');  // Return a 500 error to client
});

app.listen(PORT, () => {
  console.log(
    `\x1b[42m[*]\x1b[0m \x1b[92mListening on port ${PORT}\x1b[0m (http://localhost:${PORT}/)`
  );
});

/****************/
/*** passport ***/
/****************/

passport.use(
  new LocalStrategy(async function verify(username, password, callback) {
    try {
        const user = await daoUsers.login({ username, password });
        return callback(null, user);
    } catch(err) {
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

/**************/
/* AuthN APIs */
/**************/

app.get("/api/session",
    (req, res) => {
        if (req.isAuthenticated()) {
            res.status(200).json(req.user);
        } else {
            res.status(401).json({ error: "No active session" });
        }
    }
);

app.post("/api/login",
    function (req, res, next) {
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
    }
);

app.post("/api/signup",
    [
        body('name')
            .notEmpty().withMessage("Your name can't be an empty string")
            .isString().withMessage("Name must be string")
            .isLength({ min: 1, max: maxUserLength })
            .withMessage("Name length must be between 1 and 20"),
        body('email')
            .notEmpty().withMessage("Your email can't be an empty string")
            .isString().withMessage("Last time I checked emails were strings")
            .isLength({ min: minEmailChars }).withMessage("Your email can't be that short")
            .isEmail().withMessage("Invalid email: user@domain.tld"),
        body('birthdate')
            .notEmpty().withMessage("Your birthdate can't be an empty string")
            .isString().withMessage("Birthdate must be a string")
            .isLength({ min: minDateChars }).withMessage("Invalid birthdate")
            .matches(/^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-\d{4}$/)
            .withMessage("Birthdate must be in MM-DD-YYYY format")
            .bail()
            .isDate({ format: 'MM-DD-YYYY', strictMode: true })
            .withMessage("Invalid birthdate"),
        body('username')
            .notEmpty().withMessage("Your username can't be an empty string")
            .isString().withMessage("Username must be a string")
            .isLength({ max: maxUserLength })
            .withMessage(`Username cannot exceed ${maxUserLength} characters`),
        body('password')
            .notEmpty().withMessage("Your password can't be an empty string")
            .isString().withMessage("Password must be a string")
            .isLength({ min: minPassLength })
            .withMessage(`Password must be at least ${minPassLength} characters`)
    ],
    async (req, res) => {
        if (req.isAuthenticated()) {
            return res.status(403);
        } else {
            const errors = validationResult(req).formatWith(errorFormatter);
            if (!errors.isEmpty()) {
                return res.status(400).json({ error: errors.array()[0] });
            }
            const user = {
                name: req.body.name,
                email: req.body.email,
                birthdate: req.body.birthdate,
                username: req.body.username,
                password: req.body.password,
            };
            try {
                const result = await daoUsers.signup(user)
                if (!result) return res.status(500).json();
                return res.status(200).json({ success: result});
            } catch (err) {
                return res.status(409).json({ error: err });
            }
        }
    }
);

app.get("/api/logout", isLogged,
    (req, res) => {
        req.logout(() => {
          res.status(200).json({ success: "Logged out" });
        });
    }
);
