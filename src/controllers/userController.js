import * as userQueries from "../db/queries/user.js";

class UserController {
    async getUser(req, res) {
        res.status(200).json(await userQueries.getUser(req.params.id));
    }

    async postUser(req, res) {}

    async getUsers(req, res) {
        res.status(200).json(await userQueries.getUsers());
    }

    async deleteUser(req, res) {}
}

export default new UserController();
