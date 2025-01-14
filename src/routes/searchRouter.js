import { Router } from "express";
import SearchController from "../controllers/SearchController.js";
import { userValidator } from "./userRouter.js";
import { postValidator } from "./postRouter.js";

const searchRouter = Router();

searchRouter.get("/", (req, res) => {});

searchRouter.get("/users", userValidator[0], SearchController.searchUsers);

searchRouter.post("/posts", postValidator[0].SearchController.searchPosts);

export { searchRouter };
