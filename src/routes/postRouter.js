import { Router } from "express";
import PostController from "../controllers/PostController.js";
import { body } from "express-validator";
import { correctIdType } from "../middlewares/correctIdType.js";

const postValidator = [
    body("title")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Title cannot be empty")
        .isLength({ min: 2, max: 64 })
        .withMessage("Title lenght must be between 2 and 64 characters"),
    body("content")
        .trim()
        .optional()
        .escape()
        .isLength({ max: 2000 })
        .withMessage("Content size exceeded (2000 characters)"),
];

const postRouter = Router();

postRouter.get("/", PostController.getPosts);

postRouter.post("/", postValidator, PostController.postPost);

postRouter.use("/:genericId", correctIdType);

postRouter.get("/:id", PostController.getPost);

postRouter.delete("/:id", PostController.deletePost);

postRouter.patch("/:id", postValidator, PostController.updatePost);

postRouter.get("/:id/comments", PostController.getAllComments);

postRouter.post("/:id/like", PostController.postLike);

export { postRouter, postValidator };
