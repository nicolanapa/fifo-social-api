import { validationResult } from "express-validator";
import * as userQueries from "../db/queries/user.js";
import loginSignupController from "./loginSignupController.js";

class UserController {
    async getUsers(req, res) {
        res.status(200).json(await userQueries.getUsers());
    }

    async getUser(req, res) {
        res.status(200).json(await userQueries.getUser(req.params.id));
    }

    async postUser(req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        try {
            const password = loginSignupController.generatePassword();

            const hashedPassword =
                await loginSignupController.hashPassword(password);

            await userQueries.postUser(
                req.body.username,
                req.body.description,
                hashedPassword,
            );

            return res.status(201).json({ success: true, password: password });
        } catch {
            req.customError =
                "An Error has happened in POST /user. User couldn't be created";

            return next(new Error(req.customError));
        }
    }

    async deleteUser(req, res) {
        if (req.isAuthenticated()) {
            if (req.user.id === req.params.id || req.user.admin === "true") {
                await userQueries.deleteUser(req.params.id);

                return res.status(200).json({ success: true });
            } else {
                return res.status(401).json({
                    success: false,
                    msg: "Not enough rights to do that",
                });
            }
        }

        return res
            .status(401)
            .json({ success: false, msg: "Not authenticated" });
    }

    async getAllPosts(req, res) {
        res.status(200).json(await userQueries.getAllPosts(req.params.id));
    }
}

export default new UserController();
