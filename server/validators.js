/* SINGUP VALIDATORS TO CLEAN CODE */

'use strict';

const { body } = require('express-validator');

const minDateChars = 8;
const minPassLength = 8;
const minEmailChars = 4;
const maxUserLength = 20;

const validateName = () => {
    body('name')
            .notEmpty().withMessage("Your name can't be an empty string")
            .isString().withMessage("Name must be string")
            .isLength({ min: 1, max: maxUserLength })
            .withMessage("Name length must be between 1 and 20");
}

const validateEmail = () => {
    body('email')
        .notEmpty().withMessage("Your email can't be an empty string")
        .isString().withMessage("Last time I checked emails were strings")
        .isLength({ min: minEmailChars }).withMessage("Your email can't be that short")
        .isEmail().withMessage("Invalid email: user@domain.tld");
}

const validateDate = () => {
    body('birthdate')
        .notEmpty().withMessage("Your birthdate can't be an empty string")
        .isString().withMessage("Birthdate must be a string")
        .isLength({ min: minDateChars }).withMessage("Invalid birthdate")
        .matches(/^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-\d{4}$/)
        .withMessage("Birthdate must be in MM-DD-YYYY format")
        .bail()
        .isDate({ format: 'MM-DD-YYYY', strictMode: true })
        .withMessage("Invalid birthdate");
}

const validateUsername = () => {
    body('username')
        .notEmpty().withMessage("Your username can't be an empty string")
        .isString().withMessage("Username must be a string")
        .isLength({ max: maxUserLength })
        .withMessage(`Username cannot exceed ${maxUserLength} characters`);
}

const validatePassword = () => {
    body('password')
        .notEmpty().withMessage("Your password can't be an empty string")
        .isString().withMessage("Password must be a string")
        .isLength({ min: minPassLength })
        .withMessage(`Password must be at least ${minPassLength} characters`);
}

const signupValidators = [
    validateName,
    validateEmail,
    validateDate,
    validateUsername,
    validatePassword
];

module.exports = { signupValidators };