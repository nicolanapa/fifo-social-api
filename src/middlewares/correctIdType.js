function correctIdType(req, res, next) {
    if (req.params.genericId !== undefined) {
        if (
            Number.isInteger(parseInt(req.params.genericId)) &&
            req.params.genericId >= 1
        ) {
            return next();
        }
    }

    next(new Error(req.params.genericId + " is not a Number"));
}

export { correctIdType };
