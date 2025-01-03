import { Router } from "express";
import { body } from "express-validator";
import CommentController from "../controllers/commentController.js";
import { correctIdType } from "../middlewares/correctIdType.js";

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

commentRouter.use("/:genericId", correctIdType);

commentRouter.get("/:id", CommentController.getComment);

commentRouter.post("/:postId", commentValidator, CommentController.postComment);

commentRouter.delete("/:id", CommentController.deleteComment);

commentRouter.patch("/:id", commentValidator, CommentController.updateComment);

commentRouter.post("/:id/like", CommentController.postLike);

export { commentRouter };
