import { Router } from "express";
import CommentController from "../controllers/commentController.js";
import { body } from "express-validator";

const commentValidator = [
    body("content")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Comment can't be empty")
        .isLength({ min: 1, max: 1000 }),
];

const commentRouter = Router();

commentRouter.get("/", CommentController.getComments);

commentRouter.get("/:id", CommentController.getComment);

commentRouter.post("/:postId", commentValidator, CommentController.postComment);

commentRouter.delete("/:id", CommentController.deleteComment);

commentRouter.post("/:id/like", CommentController.postLike);

export { commentRouter };
