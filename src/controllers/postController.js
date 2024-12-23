import { validationResult } from "express-validator";
import * as postQueries from "../db/queries/post.js";

class PostController {
    async getPosts(req, res) {
        res.status(200).json(await postQueries.getPosts());
    }

    async getPost(req, res) {
        res.status(200).json(await postQueries.getPost(req.params.id));
    }

    async postPost(req, res) {
        if (req.isAuthenticated()) {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json(errors.array());
            }

            try {
                await postQueries.postPost(req.body.id, req.body.title, req.body.content);

                return res.status(201).json({ success: true });
            } catch {
                return res.status(500).json({ success: false });
            }
        }

        return res.status(401).json({ success: false, msg: "Not authenticated" });
    }

    async deletePost(req, res) {
        if (req.isAuthenticated()) {
            if (req.user.id === req.body.id || req.user.admin === "true") {
                await postQueries.deletePost(req.params.id);

                return res.status(200).json({ success: true });
            } else {
                return res
                    .status(401)
                    .json({ success: false, msg: "Not enough rights to do that" });
            }
        }

        return res.status(401).json({ success: false, msg: "Not authenticated" });
    }

    async getAllComments(req, res) {
        res.status(200).json(await postQueries.getAllComments(req.params.id));
    }
}

export default new PostController();
