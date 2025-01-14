import { Router } from "express";
import UserController from "../controllers/UserController.js";
import { body } from "express-validator";
import { checkIfUserAlreadyExists } from "../controllers/customValidatorController.js";
import { correctIdType } from "../middlewares/correctIdType.js";

const userValidator = [
    body("username")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Username mustn't be empty")
        .isLength({ min: 1, max: 64 })
        .withMessage("Username must be between 1 and 64 characters length")
        .custom(checkIfUserAlreadyExists),
    body("description")
        .trim()
        .optional()
        .escape()
        .isLength({ max: 150 })
        .withMessage("Description size exceeded (150 characters)"),
];

const userRouter = Router();

userRouter.get("/", UserController.getUsers);

userRouter.post("/", userValidator, UserController.postUser);

userRouter.use(":genericId", correctIdType);

userRouter.get("/:id", UserController.getUser);

userRouter.delete("/:id", UserController.deleteUser);

userRouter.patch("/:id", userValidator[1], UserController.updateDescription);

userRouter.get("/:id/posts", UserController.getAllPosts);

userRouter.get("/:id/followers", UserController.getFollowers);

userRouter.get("/:id/followed", UserController.getFollowed);

export { userRouter, userValidator };
