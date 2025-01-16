import { Router } from "express";
import { query } from "express-validator";
import SearchController from "../controllers/SearchController.js";
import { routeSearch } from "../middlewares/routeSearch.js";

const globalValidator = [
    query("searchInput")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Input field mustn't be empty")
        .isLength({ min: 1, max: 64 })
        .withMessage("Input field must be between 1 and 64 characters length"),
];

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
        .isLength({ min: 1, max: 64 })
        .withMessage("Title lenght must be between 1 and 64 characters"),
];

const searchRouter = Router();

searchRouter.get("/", routeSearch);

searchRouter.get("/global", globalValidator, SearchController.searchGlobal);

searchRouter.get("/users", userValidator, SearchController.searchUsers);

searchRouter.get("/posts", postValidator, SearchController.searchPosts);

export { searchRouter };
