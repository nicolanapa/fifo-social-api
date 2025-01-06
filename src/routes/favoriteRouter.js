import { Router } from "express";
import FavoriteController from "../controllers/favoriteController.js";
import { correctIdType } from "../middlewares/correctIdType.js";

const favoriteRouter = Router();

favoriteRouter.use("/:genericId", correctIdType);

favoriteRouter.get("/:userId/posts", FavoriteController.getPosts);

favoriteRouter.get("/:userId/comments", FavoriteController.getComments);

favoriteRouter.post(
    "/:id/post",
    (req, res, next) => {
        req.typeOfFavorite = "post";
        next();
    },
    FavoriteController.postFavorite,
);

favoriteRouter.post(
    "/:id/comment",
    (req, res, next) => {
        req.typeOfFavorite = "comment";
        next();
    },
    FavoriteController.postFavorite,
);

export { favoriteRouter };
