import { Router } from "express";
import commentController from "../controllers/commentController.js";
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

commentRouter.get("/", commentController.getComments);

commentRouter.get("/:id", commentController.getComment);

commentRouter.post("/:postId", commentValidator, commentController.postComment);

commentRouter.delete("/:id", commentController.deleteComment);

export { commentRouter };
