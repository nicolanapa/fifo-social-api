// eslint-disable-next-line no-unused-vars
function errorResponse(err, req, res, next) {
    if (req.customError !== undefined) {
        return res.status(500).json({ success: false, msg: req.customError });
    }

    res.status(500).json({ success: false });
}

export { errorResponse };
