import { Router } from "express";
import FollowController from "../controllers/FollowController.js";
import { correctIdType } from "../middlewares/correctIdType.js";

const followRouter = Router();

followRouter.use("/:genericId", correctIdType);

followRouter.get("/:userId", FollowController.alreadyFollows);

followRouter.post("/:userId", FollowController.follow);

followRouter.delete("/:userId", FollowController.unfollow);

export { followRouter };
