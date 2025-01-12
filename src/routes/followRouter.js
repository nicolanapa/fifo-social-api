import { Router } from "express";
import FollowController from "../controllers/FollowController.js";
import { correctIdType } from "../middlewares/correctIdType.js";

const followRouter = Router();

followRouter.use("/:genericId", correctIdType);

followRouter.get("/:userId", FollowController.alreadyFollowsUserChecker);

followRouter.put("/:userId", FollowController.addFollow);

followRouter.delete("/:userId", FollowController.removeFollow);

export { followRouter };
