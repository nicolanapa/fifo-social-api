import * as followQueries from "../db/queries/follow.js";

class FollowController {
    constructor() {
        this.alreadyFollowsUser = this.alreadyFollowsUser.bind(this);
        this.alreadyFollowsUserChecker =
            this.alreadyFollowsUserChecker.bind(this);
        this.addFollow = this.addFollow.bind(this);
    }

    async alreadyFollowsUser(userId, followedId) {
        return await followQueries.alreadyFollowsUser(userId, followedId);
    }

    async alreadyFollowsUserChecker(req, res) {
        if (req.isAuthenticated()) {
            if (req.user.id === Number(req.params.userId)) {
                return res
                    .status(400)
                    .json({ success: false, msg: "User can't follow itself" });
            }

            return res.status(200).json({
                success: true,
                isFollowing: await this.alreadyFollowsUser(
                    req.user.id,
                    req.params.userId,
                ),
            });
        }

        return res
            .status(401)
            .json({ success: false, msg: "Not authenticated" });
    }

    async addFollow(req, res, next) {
        if (req.isAuthenticated()) {
            if (req.user.id === Number(req.params.userId)) {
                return res
                    .status(400)
                    .json({ success: false, msg: "User can't follow itself" });
            }

            try {
                if (
                    await this.alreadyFollowsUser(
                        req.user.id,
                        req.params.userId,
                    )
                ) {
                    return res.status(204).send();
                } else {
                    await followQueries.addFollow(
                        req.user.id,
                        req.params.userId,
                    );

                    return res
                        .status(201)
                        .json({ success: true, msg: "User is following X" });
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

                return res.status(204).send();
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
