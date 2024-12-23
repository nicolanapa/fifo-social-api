import * as postQueries from "../db/queries/post.js";

class PostController {
    async getPosts(req, res) {
        res.status(200).json(await postQueries.getPosts());
    }

    async getPost(req, res) {
        res.status(200).json(await postQueries.getPost(req.params.id));
    }

    async postPost(req, res) {}

    async deletePost(req, res) {}

    async getAllComments(req, res) {}
}

export default new PostController();
