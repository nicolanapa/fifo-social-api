import { validationResult } from "express-validator";
import * as postQueries from "../db/queries/post.js";

class PostController {
    constructor() {
        this.setLike = this.setLike.bind(this);
        this.postLike = this.postLike.bind(this);
    }

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
                await postQueries.postPost(req.user.id, req.body.title, req.body.content);

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

    async setLike(req, res) {
        const getLike = await postQueries.getLikeStatus(req.params.id, req.user.id);
        let successMessage = "";

        if (!getLike || getLike.length === 0) {
            await postQueries.addLike(req.params.id, req.user.id);

            successMessage = "Like has been added";
        } else {
            await postQueries.removeLike(req.params.id, req.user.id);

            successMessage = "Like has been removed";
        }

        return res.status(201).json({ success: true, msg: successMessage });
    }

    async postLike(req, res) {
        if (req.isAuthenticated()) {
            if (req.user.id === req.body.id) {
                try {
                    return await this.setLike(req, res);
                } catch {
                    return res.status(500).json({ success: false });
                }
            } else {
                return res
                    .status(401)
                    .json({ success: false, msg: "Not enough rights to do that" });
            }
        }

        return res.status(401).json({ success: false, msg: "Not authenticated" });
    }
}

export default new PostController();
