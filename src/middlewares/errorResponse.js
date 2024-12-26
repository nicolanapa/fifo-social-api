// eslint-disable-next-line no-unused-vars
function errorResponse(err, req, res, next) {
    res.status(500).json({ success: false });
}

export { errorResponse };
