import { validationResult } from "express-validator";
import * as userQueries from "../db/queries/user.js";

class UserController {
    async getUser(req, res) {
        res.status(200).json(await userQueries.getUser(req.params.id));
    }

    async postUser(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        try {
            await userQueries.postUser(req.body.username, req.body.description);

            return res.status(201).json({ success: true, password: "" });
        } catch {
            return res.status(400).json({ success: false, password: "" });
        }
    }

    async getUsers(req, res) {
        res.status(200).json(await userQueries.getUsers());
    }

    async deleteUser(req, res) {}
}

export default new UserController();
