import passport from "passport";
import LocalStrategy from "passport-local";
import * as argon2 from "argon2";
import { privateTable } from "./pool.js";

const customFields = {
    usernameField: "username",
    passwordField: "password",
};

passport.use(
    new LocalStrategy(customFields, async (username, password, done) => {
        console.log(username, password);

        const { rows } = await privateTable.query(
            "SELECT * FROM user_password WHERE username = $1",
            [username],
        );
        const user = rows[0];

        if (!user) {
            return done(null, false);
        }

        if (!(await argon2.verify(user.hashed_password, password))) {
            return done(null, false);
        }

        return done(null, user);
    }),
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const { rows } = await privateTable.query(
        "SELECT * FROM user_password WHERE id = $1",
        [id],
    );
    const user = rows[0];

    done(null, user);
});

export default passport;
