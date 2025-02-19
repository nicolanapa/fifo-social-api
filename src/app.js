import express from "express";
import process from "process";
import url from "url";
import path from "path";
import cors from "cors";
import session from "express-session";
import passport from "./db/passport.js";
import connectPgSimple from "connect-pg-simple";
import { userRouter } from "./routes/userRouter.js";
import { postRouter } from "./routes/postRouter.js";
import { commentRouter } from "./routes/commentRouter.js";
import { privateTable } from "./db/pool.js";
import { loginRouter } from "./routes/loginRouter.js";
import { logError } from "./middlewares/logError.js";
import { errorResponse } from "./middlewares/errorResponse.js";
import { favoriteRouter } from "./routes/favoriteRouter.js";
import { followRouter } from "./routes/followRouter.js";
import { searchRouter } from "./routes/searchRouter.js";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;
const pgSession = connectPgSimple(session);

const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
};

const app = express();

app.use(
    session({
        store: new pgSession({
            pool: privateTable,
            tableName: "user_session",
            createTableIfMissing: true,
        }),
        secret: process.env.SECRET_SESSION,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
    }),
);
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + "/styles")));
app.use(cors(corsOptions));

app.get("/favicon.ico", (req, res) => {
    res.sendFile(__dirname + "/favicon.svg");
});

app.use("/login", loginRouter);

app.use("/user", userRouter);

app.use("/post", postRouter);

app.use("/comment", commentRouter);

app.use("/favorite", favoriteRouter);

app.use("/follow", followRouter);

app.use("/search", searchRouter);

app.use(logError);
app.use(errorResponse);

app.listen(PORT);
