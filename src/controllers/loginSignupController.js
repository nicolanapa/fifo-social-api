import { validationResult } from "express-validator";

class LoginSignupController {
    getLogin(req, res) {
        if (
            req.isAuthenticated() ||
            (req.isAuthenticated() && req.query.success)
        ) {
            return res
                .status(200)
                .json({ success: true, status: "Authenticated" });
        } else if (req.query.success === "false") {
            return res.status(401).json({
                success: false,
                msg: "Something's wrong, maybe the username or password is wrong?",
            });
        }

        return res.status(200).json({ status: "Not authenticated" });
    }

    async login(req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        next();
    }
}

export default new LoginSignupController();
