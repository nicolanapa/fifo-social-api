import { validationResult } from "express-validator";
import * as userQueries from "../db/queries/user.js";
import * as followQueries from "../db/queries/follow.js";
import loginSignupController from "./LoginSignupController.js";

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

    async deleteUser(req, res, next) {
        if (req.isAuthenticated()) {
            if (
                req.user.id === Number(req.params.id) ||
                req.user.admin === "true"
            ) {
                req.logout((err) => {
                    if (err) {
                        return next(err);
                    }
                });

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

    async updateDescription(req, res, next) {
        if (req.isAuthenticated()) {
            const user = await userQueries.getUser(req.params.id);

            if (req.user.id === user[0].user_id || req.user.admin === "true") {
                const errors = validationResult(req);

                if (!errors.isEmpty()) {
                    return res.status(400).json(errors.array());
                }

                try {
                    await userQueries.updateDescription(
                        req.params.id,
                        req.body.description,
                    );

                    return res.status(200).json({ success: true });
                } catch {
                    req.customError =
                        "An Error has happened in PATCH /user. User description couldn't be updated";

                    return next(new Error(req.customError));
                }
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

    async getFollowers(req, res) {
        res.status(200).json(await followQueries.getFollowers(req.params.id));
    }

    async getFollowed(req, res) {
        res.status(200).json(await followQueries.getFollowed(req.params.id));
    }
}

export default new UserController();
