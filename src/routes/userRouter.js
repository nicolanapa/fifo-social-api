import { Router } from "express";
import userController from "../controllers/userController";

const userRouter = Router();

userRouter.get("/", userController.getUsers);

userRouter.post("/", userController.postUser);

userRouter.get("/:id", userController.getUser);

userRouter.delete("/:id", userController.deleteUser());

export { userRouter };
