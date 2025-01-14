import { Router } from "express";
import { query } from "express-validator";
import SearchController from "../controllers/SearchController.js";

const userValidator = [
    query("username")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Username mustn't be empty")
        .isLength({ min: 1, max: 64 })
        .withMessage("Username must be between 1 and 64 characters length"),
];

const postValidator = [
    query("title")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Title cannot be empty")
        .isLength({ min: 2, max: 64 })
        .withMessage("Title lenght must be between 2 and 64 characters"),
];

const searchRouter = Router();

searchRouter.get("/", (req, res) => {});

searchRouter.get("/users", userValidator, SearchController.searchUsers);

searchRouter.get("/posts", postValidator, SearchController.searchPosts);

export { searchRouter };
