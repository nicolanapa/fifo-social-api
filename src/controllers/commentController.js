import { validationResult } from "express-validator";
import * as commentQueries from "../db/queries/comment.js";

class CommentController {
    constructor() {
        this.setLike = this.setLike.bind(this);
        this.postLike = this.postLike.bind(this);
    }

    async getComments(req, res) {
        res.status(200).json(await commentQueries.getComments());
    }

    async getComment(req, res) {
        res.status(200).json(await commentQueries.getComment(req.params.id));
    }

    async postComment(req, res) {
        if (req.isAuthenticated()) {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json(errors.array());
            }

            try {
                await commentQueries.postComment(
                    req.params.postId,
                    req.user.id,
                    req.body.content,
                );

                return res.status(201).json({ success: true });
            } catch {
                return res.status(500).json({ success: false });
            }
        }

        return res
            .status(401)
            .json({ success: false, msg: "Not authenticated" });
    }

    async deleteComment(req, res) {
        if (req.isAuthenticated()) {
            const comment = await commentQueries.getComment(req.params.id);

            if (
                req.user.id === comment[0].user_id ||
                req.user.admin === "true"
            ) {
                await commentQueries.deleteComment(req.params.id);

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

    async setLike(req, res) {
        const getLike = await commentQueries.getLikeStatus(
            req.params.id,
            req.user.id,
        );
        let successMessage = "";

        if (!getLike || getLike.length === 0) {
            await commentQueries.addLike(req.params.id, req.user.id);

            successMessage = "Like has been added";
        } else {
            await commentQueries.removeLike(req.params.id, req.user.id);

            successMessage = "Like has been removed";
        }

        return res.status(201).json({ success: true, msg: successMessage });
    }

    async postLike(req, res) {
        if (req.isAuthenticated()) {
            try {
                return await this.setLike(req, res);
            } catch {
                return res.status(500).json({ success: false });
            }
        }

        return res
            .status(401)
            .json({ success: false, msg: "Not authenticated" });
    }
}

export default new CommentController();
