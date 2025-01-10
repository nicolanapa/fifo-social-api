import * as followQueries from "../db/queries/follow.js";

class FollowController {
    async alreadyFollowsUser(userId, followedId) {
        return await followQueries.alreadyFollowsUser(userId, followedId);
    }

    // async alreadyFollowsUserChecker(req, res) {}

    async addFollow(req, res, next) {
        if (req.isAuthenticated()) {
            try {
                if (this.alreadyFollowsUser(req.user.id, req.params.id)) {
                    return res.status(204).json({ success: true });
                } else {
                    await followQueries.addFollow(req.user.id, req.params.id);
                    return res.status(201);
                }
            } catch {
                req.customError =
                    "An Error has happened in PUT /follow/:userId";

                return next(new Error(req.customError));
            }
        }

        return res
            .status(401)
            .json({ success: false, msg: "Not authenticated" });
    }

    async removeFollow(req, res, next) {
        if (req.isAuthenticated()) {
            try {
                await followQueries.removeFollow(
                    req.user.id,
                    req.params.userId,
                );

                return res.status(204).json({ success: true });
            } catch {
                req.customError =
                    "An Error has happened in DELETE /follow/:userId";

                return next(new Error(req.customError));
            }
        }

        return res
            .status(401)
            .json({ success: false, msg: "Not authenticated" });
    }
}

export default new FollowController();
