import * as favoriteQueries from "../db/queries/favorite.js";

class FavoriteController {
    constructor() {
        this.setFavorite = this.setFavorite.bind(this);
        this.postFavorite = this.postFavorite.bind(this);
    }

    async getPosts(req, res) {
        res.status(200).json(await favoriteQueries.getPosts(req.params.userId));
    }

    async getComments(req, res) {
        res.status(200).json(
            await favoriteQueries.getComments(req.params.userId),
        );
    }

    async setFavorite(req, res) {
        let getFavorite = [];

        if (req.typeOfFavorite === "post") {
            getFavorite = await favoriteQueries.getPosts(req.user.id);
        } else if (req.typeOfFavorite === "comment") {
            getFavorite = await favoriteQueries.getComments(req.user.id);
        }

        let successMessage = "";

        if (
            !getFavorite ||
            getFavorite.length === 0 ||
            !getFavorite.some(
                (favorite) => favorite.id === Number(req.params.id),
            )
        ) {
            await favoriteQueries.addFavorite(
                req.user.id,
                req.params.id,
                req.typeOfFavorite,
            );

            successMessage = "Favorite has been added to " + req.typeOfFavorite;
        } else {
            await favoriteQueries.removeFavorite(
                req.user.id,
                req.params.id,
                req.typeOfFavorite,
            );

            successMessage =
                "Favorite has been removed from " + req.typeOfFavorite;
        }

        return res.status(201).json({ success: true, msg: successMessage });
    }

    async postFavorite(req, res, next) {
        if (req.isAuthenticated()) {
            try {
                return await this.setFavorite(req, res);
            } catch {
                req.customError =
                    "An Error has happened in POST /post/:id/like";

                return next(new Error(req.customError));
            }
        }

        return res
            .status(401)
            .json({ success: false, msg: "Not authenticated" });
    }
}

export default new FavoriteController();
