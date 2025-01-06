import { Router } from "express";
import FavoriteController from "../controllers/favoriteController.js";
import { correctIdType } from "../middlewares/correctIdType.js";

const favoriteRouter = Router();

favoriteRouter.use("/:genericId", correctIdType);

favoriteRouter.get("/:userId/posts", FavoriteController.getPosts);

favoriteRouter.get("/:userId/comments", FavoriteController.getComments);

favoriteRouter.post("/:userId/post/:postId", FavoriteController.postPost);

favoriteRouter.post(
    "/:userId/comment/:commentId",
    FavoriteController.postComment,
);

export { favoriteRouter };
