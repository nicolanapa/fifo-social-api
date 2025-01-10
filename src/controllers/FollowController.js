import * as followQueries from "../db/queries/follow.js";

class FollowController {
    async alreadyFollowsUser(req, res) {}

    async addFollow(req, res, next) {}

    async removeFollow(req, res, next) {
        if (req.isAuthenticated()) {
            try {
                await followQueries.removeFollow(
                    req.user.id,
                    req.params.userId,
                );

                return res.status(200).json({ success: true });
            } catch {
                req.customError = "An Error has happened in DELETE /follow/:id";

                return next(new Error(req.customError));
            }
        }

        return res
            .status(401)
            .json({ success: false, msg: "Not authenticated" });
    }
}

export default new FollowController();
