import { Router } from "express";
import { body } from "express-validator";
import passport from "../db/passport.js";
import loginSignupController from "../controllers/loginSignupController.js";

const postValidator = [
    body("username")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Username cannot be empty")
        .isLength({ min: 2, max: 64 })
        .withMessage("Username lenght must be between 2 and 64 characters"),
    body("password")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Password cannot be empty"),
];

const loginRouter = Router();

loginRouter.get("/", loginSignupController.getLogin);

loginRouter.post(
    "/",
    postValidator,
    loginSignupController.login,
    passport.authenticate("local", {
        successRedirect: "/login?success=true",
        failureRedirect: "/login?success=false",
    }),
);

export { loginRouter };
