const Message = require('../models/message');
const User = require('../models/user');
const bcrypt = require("bcryptjs");
const passport = require("passport");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.user_create_get = asyncHandler(async (req, res, next) =>
{
    res.render("user_create_form", {title: "Sign Up Form", errors: []})
});

exports.user_create_post = [
    body("first_name")
    .trim()
    .isAlpha('en-US')
    .escape(),
    body("last_name")
    .trim()
    .isAlpha('en-US')
    .escape(),
    body("username")
    .trim()
    .isAlphanumeric("en-US")
    .escape(),
    body("password")
    .trim()
    .isAlphanumeric("en-US")
    .escape(),
    body("confirm_password")
    .custom((value, {req}) => {
        return value === req.body.password;
    }),

    async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render("user_create_form", {
                title: "Sign Up Form",
                errors: errors.array(),
              });
        }

        try {
            bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
                // if err, do something
                if (err) {
                    return next(err);
                }
                // otherwise, store hashedPassword in DB
                else {
                    const user = new User({
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        username: req.body.username,
                        password: hashedPassword,
                        membership_status: false,
                        admin: false,
                      });
                      const result = await user.save();
                      res.redirect("/");
                }
              });
        }
        catch(error) {
            next(error);
        }
    }
];

exports.user_login_get = asyncHandler(async (req, res, next) =>
{
    res.send("NOT IMPLEMENTED: User login GET");
});

exports.user_login_post = [
    asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: User login POST")
    }
)
];

exports.user_secret_get = asyncHandler(async (req, res, next) =>
{
    res.send("NOT IMPLEMENTED: User secret GET");
});

exports.user_secret_post = [
    asyncHandler(async (req, res, next) => {
        res.send("NOT IMPLEMENTED: User secret POST")
        })
];

exports.user_admin_get = asyncHandler(async (req, res, next) =>
{
    res.send("NOT IMPLEMENTED: User admin GET");
});

exports.user_admin_post = [
    asyncHandler(async (req, res, next) => {
        res.send("NOT IMPLEMENTED: User admin POST")
        })
];