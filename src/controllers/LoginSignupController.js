import { validationResult } from "express-validator";
import process from "process";
import Crypto from "crypto";
import * as argon2 from "argon2";

class LoginSignupController {
    getLogin(req, res) {
        if (
            req.isAuthenticated() ||
            (req.isAuthenticated() && req.query.success)
        ) {
            return res.status(200).json({
                success: true,
                status: "Authenticated",
                isAuthenticated: true,
                username: req.user.username,
                id: req.user.id,
            });
        } else if (req.query.success === "false") {
            return res.status(401).json({
                success: false,
                msg: "Something's wrong, maybe the username or password is wrong?",
                isAuthenticated: false,
            });
        }

        return res
            .status(200)
            .json({ status: "Not authenticated", isAuthenticated: false });
    }

    async login(req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        next();
    }

    generatePassword() {
        let password = "";

        for (let i = 0; i < process.env.LENGTH_GENERATED_PASSWORD; i++) {
            password += Crypto.randomUUID();
        }

        return password;
    }

    async hashPassword(password) {
        return await argon2.hash(password);
    }
}

export default new LoginSignupController();
