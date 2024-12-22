import { Router } from "express";
import userController from "../controllers/userController.js";
import { body } from "express-validator";

const userValidator = [
    body("username")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Username mustn't be empty")
        .isLength({ min: 1, max: 64 })
        .withMessage("Username must be between 1 and 64 characters length"),
    body("description")
        .trim()
        .optional()
        .isLength({ max: 150 })
        .withMessage("Description size exceeded (150 characters)"),
];

const userRouter = Router();

userRouter.get("/", userController.getUsers);

userRouter.post("/", userValidator, userController.postUser);

userRouter.get("/:id", userController.getUser);

userRouter.delete("/:id", userController.deleteUser);

export { userRouter };
