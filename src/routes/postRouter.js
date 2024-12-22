import { Router } from "express";
import postController from "../controllers/postController.js";

const postRouter = Router();

postRouter.get("/", postController.getPosts);

postRouter.post("/", postController.postPost);

postRouter.get("/:id", postController.getPost);

postRouter.delete("/:id", postController.deletePost);

postRouter.get("/:id/comments", postController.getAllComments);

export { postRouter };
