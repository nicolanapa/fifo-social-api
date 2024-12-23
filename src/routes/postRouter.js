import { Router } from "express";
import postController from "../controllers/postController.js";
import { body } from "express-validator";

const postValidator = [
    body("title")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Title cannot be empty")
        .isLength({ min: 2, max: 64 })
        .withMessage("Title lenght must be between 2 and 64 characters"),
    body("content").trim().optional().escape().isLength({ max: 2000 }),
];

const postRouter = Router();

postRouter.get("/", postController.getPosts);

postRouter.post("/", postValidator, postController.postPost);

postRouter.get("/:id", postController.getPost);

postRouter.delete("/:id", postController.deletePost);

postRouter.get("/:id/comments", postController.getAllComments);

export { postRouter };
