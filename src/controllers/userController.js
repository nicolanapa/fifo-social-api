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

        return res.status(201).send(true);
    }

    async getUsers(req, res) {
        res.status(200).json(await userQueries.getUsers());
    }

    async deleteUser(req, res) {}
}

export default new UserController();
