import * as postQueries from "../db/queries/post.js";

class PostController {
    async getPosts(req, res) {
        res.status(200).json(await postQueries.getPosts());
    }

    async getPost(req, res) {
        res.status(200).json(await postQueries.getPost(req.params.id));
    }

    async postPost(req, res) {}

    async deletePost(req, res) {
        if (req.isAuthenticated()) {
            if (req.user.id === req.body.id || req.user.admin === "true") {
                await postQueries.deletePost(req.params.id, req.user.id);

                return res.status(200).json({ success: true });
            } else {
                return res
                    .status(401)
                    .json({ success: false, msg: "Not enough rights to do that" });
            }
        }

        return res.status(401).json({ success: false, msg: "Not authenticated" });
    }

    async getAllComments(req, res) {}
}

export default new PostController();
