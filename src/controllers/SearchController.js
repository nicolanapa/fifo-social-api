import { validationResult } from "express-validator";
import { getUsersLike } from "../db/queries/user.js";
import { getPostsLike } from "../db/queries/post.js";

class SearchController {
    async searchGlobal(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        res.status(200).json([
            await getUsersLike(req.query.searchInput),
            await getPostsLike(req.query.searchInput),
        ]);
    }

    async searchUsers(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        res.status(200).json(await getUsersLike(req.query.username));
    }

    async searchPosts(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        res.status(200).json(await getPostsLike(req.query.title));
    }
}

export default new SearchController();
