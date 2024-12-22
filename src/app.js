import express from "express";
import process from "process";
import url from "url";
import path from "path";
import session from "express-session";
import passport from "passport";
import { userRouter } from "./routes/userRouter.js";
import { postRouter } from "./routes/postRouter.js";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;

const app = express();

app.use(session({ secret: process.env.SECRET_SESSION, resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + "/styles")));

app.use("/user", userRouter);

app.use("/post", postRouter);

app.listen(PORT);
